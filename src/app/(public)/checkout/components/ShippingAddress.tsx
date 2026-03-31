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

// Define a type for the form data we expect in the context
type CheckoutFormData = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  notes?: string;
  email?: string;
  // Payment fields are also in here but not used in this component
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
      const { fullName, phoneNumber, fullAddress, notes, email } =
        shippingInfoData.data;
      setValue("fullName", fullName || "");
      if (!disablePhoneAutoFill) {
        setValue("phoneNumber", phoneNumber || "");
      }
      setValue("fullAddress", fullAddress || "");
      setValue("notes", notes || "");
      setValue("email", email || "");
    } else if (!hasAccount) {
      const storedShippingAddress = localStorage.getItem("shippingAddress");
      if (storedShippingAddress) {
        const parsedAddress = JSON.parse(storedShippingAddress);
        setShippingAddress(parsedAddress);
        // Set form field values using setValue
        setValue("fullName", parsedAddress.fullName);
        if (!disablePhoneAutoFill) {
          setValue("phoneNumber", parsedAddress.phoneNumber);
        }
        setValue("fullAddress", parsedAddress.fullAddress);
        setValue("notes", parsedAddress.notes || "");
        setValue("email", parsedAddress.email || "");

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
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            নাম
            <span className="text-red-600">*</span>
          </Label>
          <Input
            placeholder="আপনার নাম লিখুন"
            {...register("fullName", {
              required: "নাম আবশ্যক।",
              maxLength: {
                value: 30,
                message: "নাম ৩০ অক্ষরের বেশি হতে পারবে না।",
              },
            })}
          />
          {errors.fullName && (
            <ErrorMessage message={errors.fullName.message} className="mt-1" />
          )}
        </div>
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            মোবাইল নম্বর <span className="text-red-600">*</span>
          </Label>
          <Input
            placeholder="আপনার মোবাইল নম্বর লিখুন"
            {...register("phoneNumber", {
              required: "মোবাইল নম্বর আবশ্যক।",
              pattern: {
                value: /^(?:\+88)?01[3-9]\d{8}$/,
                message: "সঠিক মোবাইল নম্বর দিন।",
              },
            })}
          />
          {errors.phoneNumber && (
            <ErrorMessage
              message={errors.phoneNumber.message}
              className="mt-1"
            />
          )}
        </div>
        {/* <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            Email (Optional)
          </Label>
          <Input
            placeholder="Enter your email"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage message={errors.email.message} className="mt-1" />
          )}
        </div> */}
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            ঠিকানা <span className="text-red-600">*</span>
          </Label>
          <Input
            placeholder="আপনার ঠিকানা লিখুন"
            {...register("fullAddress", {
              required: "ঠিকানা আবশ্যক।",
            })}
          />
          {errors.fullAddress && (
            <ErrorMessage
              message={errors.fullAddress.message}
              className="mt-1"
            />
          )}
        </div>
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">নোট (ঐচ্ছিক)</Label>
          <textarea
            placeholder="কোনো নির্দিষ্ট নির্দেশনা থাকলে লিখুন..."
            {...register("notes")}
            className="w-full h-20 ring-1 ring-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-primary outline-none"
          ></textarea>
          {errors.notes && (
            <ErrorMessage message={errors.notes.message} className="mt-1" />
          )}
        </div>
      </div>
    </Box>
  );
};

export default ShippingAddress;
