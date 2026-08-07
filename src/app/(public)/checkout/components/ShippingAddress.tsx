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
    <Box className="bg-background px-4 py-2 border">
      <BoxHeading className="flex items-center gap-2">
        <Truck className="text-lg text-primary" />
        <span className="text-lg">Delivery Address</span>
      </BoxHeading>
      {customerHasAccount && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">Default Shipping Address</CardTitle>
            <CardDescription>
              {shippingAddress
                ? `Address: ${shippingAddress?.fullAddress}`
                : "You have not set a default shipping address."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Link href="/my-account/add-shipping-address">
              <div
                className="cursor-pointer text-primary"
                title="Edit shipping address"
              >
                Edit address
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
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="shipping.fullName"
              placeholder="Enter your name"
              {...register("shipping.fullName", {
                required: "Please enter your name",
                maxLength: {
                  value: 30,
                  message: "Name cannot exceed 30 characters",
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
              Mobile Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="shipping.phoneNumber"
              placeholder="Enter your mobile number"
              {...register("shipping.phoneNumber", {
                required: "Please enter your mobile number",
                pattern: {
                  value: /^(?:\+88)?01[3-9]\d{8}$/,
                  message: "Please enter a valid mobile number",
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
            Email (optional)
          </Label>
          <Input
            id="shipping.email"
            placeholder="Enter your email"
            {...register("shipping.email", {
              validate: (value) => {
                if (!value) return true; // Optional field
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                  return "Please enter a valid email";
                if (value.length > 50)
                  return "Email cannot exceed 50 characters";
                if (value.length < 5)
                  return "Email must be at least 5 characters";
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
            Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="shipping.fullAddress"
            placeholder="Landmark/house number, road/village/area..."
            {...register("shipping.fullAddress", {
              required: "Please enter your address",
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
            Notes (optional)
          </Label>
          <textarea
            id="shipping.notes"
            placeholder="Add any special delivery instructions..."
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
