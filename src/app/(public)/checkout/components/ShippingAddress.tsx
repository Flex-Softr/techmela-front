"use client";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      const { fullName, phoneNumber, fullAddress, notes } =
        shippingInfoData.data;
      setValue("shipping.fullName", fullName || "");
      if (!disablePhoneAutoFill) {
        setValue("shipping.phoneNumber", phoneNumber || "");
      }
      setValue("shipping.fullAddress", fullAddress || "");
      setValue("shipping.notes", notes || "");
    } else if (!hasAccount) {
      const storedShippingAddress = localStorage.getItem("shippingAddress");
      if (storedShippingAddress) {
        const parsedAddress = JSON.parse(storedShippingAddress);
        setShippingAddress(parsedAddress);
        // Set form field values using setValue
        setValue("shipping.fullName", parsedAddress.fullName || "");
        if (!disablePhoneAutoFill) {
          setValue("shipping.phoneNumber", parsedAddress.phoneNumber || "");
        }
        setValue("shipping.fullAddress", parsedAddress.fullAddress || "");
        setValue("shipping.notes", parsedAddress.notes || "");

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
    <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Truck className="size-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Delivery Information
          </h2>
          <p className="text-xs text-slate-500">
            Please provide your contact and delivery address
          </p>
        </div>
      </div>

      {customerHasAccount && (
        <Card className="w-full mb-5">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-bold">Default Shipping Address</CardTitle>
            <CardDescription className="text-xs mt-1">
              {shippingAddress
                ? `Address: ${shippingAddress?.fullAddress}`
                : "You have not set a default shipping address."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Link href="/my-account/add-shipping-address">
              <div
                className="cursor-pointer text-xs font-semibold text-primary hover:underline"
                title="Edit shipping address"
              >
                Edit address
              </div>
            </Link>
          </CardFooter>
        </Card>
      )}

      <div id="shipping-address-form" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="shipping.fullName"
              className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1"
            >
              <span>Full Name</span>
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="shipping.fullName"
              placeholder="e.g. John Doe"
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
              {...register("shipping.fullName", {
                required: "Please enter your full name",
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
              className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1"
            >
              <span>Phone Number</span>
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="shipping.phoneNumber"
              placeholder="01XXXXXXXXX"
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
              {...register("shipping.phoneNumber", {
                required: "Please enter your phone number",
                pattern: {
                  value: /^(?:\+88)?01[3-9]\d{8}$/,
                  message: "Please enter a valid phone number",
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
            htmlFor="shipping.fullAddress"
            className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1"
          >
            <span>Full Address</span>
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="shipping.fullAddress"
            placeholder="House/Apartment, Road, Area, Thana, District"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:bg-white focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
            {...register("shipping.fullAddress", {
              required: "Please enter your full address",
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
            className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5 block"
          >
            Additional Note (optional)
          </Label>
          <textarea
            id="shipping.notes"
            placeholder="Add special delivery instructions, landmark, preferred time, etc..."
            {...register("shipping.notes")}
            className="w-full h-22 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 resize-none"
          ></textarea>
          {errors.shipping?.notes && (
            <ErrorMessage
              message={errors.shipping.notes.message}
              className="mt-1"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
