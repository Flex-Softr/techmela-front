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
import { shippingInfo } from "@/schemas/shippingInfo";
import { TShippingInfo } from "@/types/order/shippingInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type FormData = {
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  notes?: string | null | undefined;
};

const ShippingAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(shippingInfo),
    shouldFocusError: false,
  });
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
      const { fullName, phoneNumber, fullAddress, notes } =
        shippingInfoData.data;
      setValue("fullName", fullName || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("fullAddress", fullAddress || "");
      setValue("notes", notes || "");
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

        // Sync with Redux immediately so CheckoutPageContent sees the data
        dispatch(setShippingInfo(parsedAddress));
      }
    }
  }, [setValue, shippingInfoData.data, dispatch]);

  useEffect(() => {
    if (shippingInfoData?.errors && shippingInfoData.errors.length > 0) {
      // Check which field has error and focus it
      // Simple heuristic: check if explicit strings match, or just focus the first common field
      // Since errors is a string array, we might not know exactly which field, but usually "Name" or "Phone" is first.
      // We can try to map error messages to fields or just default to fullName if generic.
      // However, usually validations are "Name is required".

      const errorStrings = shippingInfoData.errors.join(" ").toLowerCase();
      if (errorStrings.includes("name")) {
        setFocus("fullName");
      } else if (errorStrings.includes("phone")) {
        setFocus("phoneNumber");
      } else if (errorStrings.includes("address")) {
        setFocus("fullAddress");
      } else {
        setFocus("fullName"); // Default to first field
      }
      // Scroll into view logic if needed, but setFocus usually handles it or we can do manual scroll
      const element = document.getElementById("shipping-address-form");
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [shippingInfoData.errors, setFocus]);

  const checkCustomerAccount = () => {
    const isLoggedIn = false;
    const hasAccountId = false;
    return isLoggedIn || hasAccountId;
  };

  const onSubmit = (data: FormData) => {
    const notes =
      data.notes !== null && data.notes !== undefined ? data.notes : "";
    const shippingInfo: TShippingInfo = {
      ...data,
      notes,
    };
    dispatch(setShippingInfo(shippingInfo));
    dispatch(setShippingInfoError({ errors: null }));
    localStorage.setItem("shippingAddress", JSON.stringify(shippingInfo));
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      const errorMessages = Object?.keys(errors).map(
        (item) => errors[item as keyof typeof errors]?.message
      );
      dispatch(setShippingInfoError({ errors: errorMessages }));
    }
  }, [dispatch, errors]);

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
      <form
        id="shipping-address-form"
        onBlur={handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <div>
          <Label className="font-bold pl-1 pb-1 block">Name*</Label>
          <Input placeholder="Enter your full name" {...register("fullName")} />
          {errors.fullName && (
            <ErrorMessage message={errors.fullName.message} className="mt-1" />
          )}
        </div>
        <div>
          <Label className="font-bold pl-1 pb-1 block">Phone Number*</Label>
          <Input
            placeholder="Enter your phone number"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <ErrorMessage
              message={errors.phoneNumber.message}
              className="mt-1"
            />
          )}
        </div>
        <div>
          <Label className="font-bold pl-1 pb-1 block">Address*</Label>
          <Input
            placeholder="Enter your full address"
            {...register("fullAddress")}
          />
          {errors.fullAddress && (
            <ErrorMessage
              message={errors.fullAddress.message}
              className="mt-1"
            />
          )}
        </div>
        <div>
          <Label className="font-bold pl-1 pb-1 block">
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
      </form>
    </Box>
  );
};

export default ShippingAddress;
