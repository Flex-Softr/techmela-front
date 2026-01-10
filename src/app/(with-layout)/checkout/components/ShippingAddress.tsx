"use client";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
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

const ShippingAddress = () => {
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
      setValue("phoneNumber", phoneNumber || "");
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
        setValue("phoneNumber", parsedAddress.phoneNumber);
        setValue("fullAddress", parsedAddress.fullAddress);
        setValue("notes", parsedAddress.notes || "");
        setValue("email", parsedAddress.email || "");

        // Sync with Redux immediately so CheckoutPageContent sees the data
        dispatch(setShippingInfo(parsedAddress));
      }
    }
  }, [setValue, shippingInfoData.data, dispatch]);

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
    <Box className="bg-white p-4">
      <BoxHeading>Shipping Address</BoxHeading>
      {customerHasAccount && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">Default Shipping Address</CardTitle>
            <CardDescription>
              {shippingAddress
                ? `Full Address: ${shippingAddress?.fullAddress}`
                : "You have not set a default shipping address."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Link href="/my-account/add-shipping-address">
              <div
                className="cursor-pointer text-blue-600"
                title="Edit Shipping Address"
              >
                Edit Address
              </div>
            </Link>
          </CardFooter>
        </Card>
      )}
      <div id="shipping-address-form" className="space-y-3">
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            Name
            <span className="text-red-600">*</span>
          </Label>
          <Input
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Name is required",
              maxLength: {
                value: 20,
                message: "Name can not be greater than 20 character.",
              },
            })}
          />
          {errors.fullName && (
            <ErrorMessage message={errors.fullName.message} className="mt-1" />
          )}
        </div>
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            Phone Number <span className="text-red-600">*</span>
          </Label>
          <Input
            placeholder="Enter your phone number"
            {...register("phoneNumber", {
              required: "Phone number is required.",
              pattern: {
                value: /^(?!.*[a-zA-Z])01\d{9}$/,
                message:
                  "Please provide a valid mobile number starting with 01 and with a total of 11 digits.",
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
        <div>
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
        </div>
        <div>
          <Label className="font-bold pl-1 mb-1.5 block">
            Address <span className="text-red-600">*</span>
          </Label>
          <Input
            placeholder="Enter your full address"
            {...register("fullAddress", {
              required: "Full address is required",
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
          <Label className="font-bold pl-1 mb-1.5 block">
            Review / Notes (Optional)
          </Label>
          <textarea
            placeholder="Any specific instructions..."
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
