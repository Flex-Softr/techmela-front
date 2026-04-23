"use client";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  setShippingInfo,
  setShippingInfoError,
} from "@/redux/features/order/shippingInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TShippingInfo } from "@/types/order/shippingInfo";
import { Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import DivisionDistrictUpazilaSelector from "./DivisionDistrictSelector";

// Define a type for the form data we expect in the context
type CheckoutFormData = {
  shipping: TShippingInfo;
  paymentMethod: string;
  paymentDetails?: Record<string, string | number>;
};

const ShippingAddress = ({
  disablePhoneAutoFill = false,
}: {
  disablePhoneAutoFill?: boolean;
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext<CheckoutFormData>();

  const dispatch = useAppDispatch();
  const shippingInfoData = useAppSelector((state) => state.shippingInfo);

  const [customerHasAccount, setCustomerHasAccount] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<TShippingInfo | null>(
    null
  );

  useEffect(() => {
    const hasAccount = checkCustomerAccount();
    setCustomerHasAccount(hasAccount);

    if (shippingInfoData?.data) {
      const {
        fullName,
        phoneNumber,
        fullAddress,
        notes,
        email,
        division,
        district,
        upazila,
      } = shippingInfoData.data;
      setValue("shipping.fullName", fullName || "");
      if (!disablePhoneAutoFill) {
        setValue("shipping.phoneNumber", phoneNumber || "");
      }
      setValue("shipping.fullAddress", fullAddress || "");
      setValue("shipping.notes", notes || "");
      setValue("shipping.email", email || "");
      setValue("shipping.division", division || "");
      setValue("shipping.district", district || "");
      setValue("shipping.upazila", upazila || "");
    } else if (!hasAccount) {
      const storedShippingAddress = localStorage.getItem("shippingAddress");
      if (storedShippingAddress) {
        const parsedAddress = JSON.parse(storedShippingAddress);
        setShippingAddress(parsedAddress);
        // Set form field values using setValue
        setValue("shipping.fullName", parsedAddress.fullName);
        if (!disablePhoneAutoFill) {
          setValue("shipping.phoneNumber", parsedAddress.phoneNumber);
        }
        setValue("shipping.fullAddress", parsedAddress.fullAddress);
        setValue("shipping.notes", parsedAddress.notes || "");
        setValue("shipping.email", parsedAddress.email || "");
        setValue("shipping.division", parsedAddress.division || "");
        setValue("shipping.district", parsedAddress.district || "");
        setValue("shipping.upazila", parsedAddress.upazila || "");

        // Sync with Redux immediately so CheckoutPageContent sees the data
        dispatch(setShippingInfo(parsedAddress));
      }
    }
  }, [setValue, shippingInfoData.data, dispatch, disablePhoneAutoFill]);

  const checkCustomerAccount = () => {
    const isLoggedIn = false;
    const hasAccountId = false;
    return isLoggedIn || hasAccountId;
  };

  useEffect(() => {
    // If Redux has errors (e.g. from backend), we might want to show them?
    // But now validation is client-side via RHF.
    // If we want to sync RHF errors to Redux (unlikely needed anymore), we could.
    // We'll clear Redux errors on mount to be safe.
    dispatch(setShippingInfoError({ errors: null }));
  }, [dispatch]);

  return (
    <Box className="bg-white px-4 py-2 border">
      <BoxHeading className="flex items-center gap-2">
        <Truck className="text-lg text-primary" />
        <span className="text-lg">ডেলিভারি ঠিকানা</span>
      </BoxHeading>
      {customerHasAccount && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">ডিফল্ট শিপিং ঠিকানা</CardTitle>
            <CardDescription>
              {shippingAddress
                ? `ঠিকানা: ${shippingAddress?.fullAddress}`
                : "আপনি কোনো ডিফল্ট শিপিং ঠিকানা সেট করেননি।"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Link href="/my-account/add-shipping-address">
              <div
                className="cursor-pointer text-blue-600"
                title="শিপিং ঠিকানা সম্পাদনা করুন"
              >
                ঠিকানা সম্পাদনা করুন
              </div>
            </Link>
          </CardFooter>
        </Card>
      )}
      <div id="shipping-address-form" className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="shipping.fullName"
              className="font-bold pl-1 mb-1.5 block"
            >
              নাম <span className="text-red-600">*</span>
            </Label>
            <Input
              id="shipping.fullName"
              placeholder="আপনার নাম লিখুন"
              {...register("shipping.fullName", {
                required: "আপনার নাম লিখুন",
                maxLength: {
                  value: 30,
                  message: "নাম ৩০ অক্ষরের বেশি হতে পারবে না",
                },
              })}
            />
            {errors.shipping?.fullName && (
              <ErrorMessage
                message={errors.shipping.fullName.message}
                className="mt-1"
              />
            )}
          </div>
          <div>
            <Label
              htmlFor="shipping.phoneNumber"
              className="font-bold pl-1 mb-1.5 block"
            >
              মোবাইল নম্বর <span className="text-red-600">*</span>
            </Label>
            <Input
              id="shipping.phoneNumber"
              placeholder="আপনার মোবাইল নম্বর লিখুন"
              {...register("shipping.phoneNumber", {
                required: "আপনার মোবাইল নম্বর লিখুন",
                pattern: {
                  value: /^(?:\+88)?01[3-9]\d{8}$/,
                  message: "সঠিক মোবাইল নম্বর দিন",
                },
              })}
            />
            {errors.shipping?.phoneNumber && (
              <ErrorMessage
                message={errors.shipping.phoneNumber.message}
                className="mt-1"
              />
            )}
          </div>
        </div>
        <div>
          <Label
            htmlFor="shipping.email"
            className="font-bold pl-1 mb-1.5 block"
          >
            ইমেইল (ঐচ্ছিক)
          </Label>
          <Input
            id="shipping.email"
            placeholder="আপনার ইমেইল লিখুন"
            {...register("shipping.email", {
              validate: (value) => {
                if (!value) return true; // Optional field
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                  return "সঠিক ইমেইল দিন";
                if (value.length > 50)
                  return "ইমেইল ৫০ অক্ষরের বেশি হতে পারবে না";
                if (value.length < 5) return "ইমেইল ৫ অক্ষরের কম হতে পারবে না";
                return true;
              },
            })}
          />
          {errors.shipping?.email && (
            <ErrorMessage
              message={errors.shipping.email.message}
              className="mt-1"
            />
          )}
        </div>
        <div>
          <DivisionDistrictUpazilaSelector
            control={control}
            register={register}
            setValue={setValue}
            errors={errors}
            shipping={shippingAddress || undefined}
          />
        </div>
        <div>
          <Label
            htmlFor="shipping.fullAddress"
            className="font-bold pl-1 mb-1.5 block"
          >
            ঠিকানা <span className="text-red-600">*</span>
          </Label>
          <Input
            id="shipping.fullAddress"
            placeholder="পরিচিত স্থান/বাসা নম্বর, রাস্তা/গ্রাম/এলাকা..."
            {...register("shipping.fullAddress", {
              required: "আপনার ঠিকানা লিখুন",
            })}
          />
          {errors.shipping?.fullAddress && (
            <ErrorMessage
              message={errors.shipping.fullAddress.message}
              className="mt-1"
            />
          )}
        </div>
        <div>
          <Label
            htmlFor="shipping.notes"
            className="font-bold pl-1 mb-1.5 block"
          >
            নোট (ঐচ্ছিক)
          </Label>
          <textarea
            id="shipping.notes"
            placeholder="কোনো নির্দিষ্ট নির্দেশনা থাকলে লিখুন..."
            {...register("shipping.notes")}
            className="w-full h-20 ring-1 ring-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
          ></textarea>
          {errors.shipping?.notes && (
            <ErrorMessage
              message={errors.shipping.notes.message}
              className="mt-1"
            />
          )}
        </div>
      </div>
    </Box>
  );
};

export default ShippingAddress;
