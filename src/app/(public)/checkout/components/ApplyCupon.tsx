"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCoupon } from "@/redux/features/order/couponInfo";
import { useGetCouponCalculationMutation } from "@/redux/features/order/getCouponCalculation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastAction } from "../../../../components/ui/toast";
import { toast } from "../../../../components/ui/use-toast";

type TFormValues = {
  promoCode: string;
};

export default function ApplyCupon() {
  const dispatch = useAppDispatch();
  const shippingInfo = useAppSelector((state) => state.shippingInfo);
  const paymentInfo = useAppSelector((state) => state.paymentInfo);
  const shippingClass = useAppSelector((state) => state.shippingClass);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const [getCouponCalculation] = useGetCouponCalculationMutation();

  const onSubmit = async (data: TFormValues) => {
    if (!data.promoCode) return;
    setLoading(true);

    const shippingDetails = {
      fullName: shippingInfo?.data?.fullName,
      phoneNumber: shippingInfo?.data?.phoneNumber,
      division: shippingInfo?.data?.division,
      district: shippingInfo?.data?.district,
      upazila: shippingInfo?.data?.upazila,
      fullAddress: shippingInfo?.data?.fullAddress,
      email: shippingInfo?.data?.email || undefined,
    };

    const paymentMethod = paymentInfo?.data?.selectedPaymentMethod?._id;
    const shippingCharge = shippingClass._id;

    const requestBody = {
      payment: {
        paymentMethod: paymentMethod,
      },
      shippingCharge: shippingCharge,
      shipping: shippingDetails,
      coupon: data.promoCode,
    };

    try {
      const appliedCoupon = await getCouponCalculation(requestBody).unwrap();
      if (appliedCoupon.success) {
        dispatch(
          setCoupon({
            couponDiscount:
              typeof appliedCoupon?.data?.couponDiscount === "object"
                ? appliedCoupon?.data?.couponDiscount?.priceSave ||
                  appliedCoupon?.data?.couponDiscount?.discountAmount
                : appliedCoupon?.data?.couponDiscount,
            shippingChange: appliedCoupon?.data?.shippingChange,
            coupon: data?.promoCode,
            cost:
              typeof appliedCoupon?.data?.cost === "object"
                ? appliedCoupon?.data?.cost?.regularPrice ||
                  appliedCoupon?.data?.cost?.price
                : appliedCoupon?.data?.cost,
          })
        );

        setApplied(true);

        toast({
          title: "Coupon applied successfully",
          action: <ToastAction altText="Thanks">Thanks</ToastAction>,
          className: "bg-success text-success-foreground border-none",
        });
      } else {
        const errorMessage = appliedCoupon?.errorMessages?.[0]?.message;

        toast({
          variant: "destructive",
          title: errorMessage,
          action: (
            <ToastAction onClick={() => reset()} altText="Try again">
              Try again
            </ToastAction>
          ),
        });

        setApplied(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error?.data?.errorMessages?.[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";

      setApplied(false);
      toast({
        variant: "destructive",
        title: errorMessage,
        action: (
          <ToastAction onClick={() => reset()} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-1">
      <div className="flex items-center gap-2">
        <div className="w-full">
          <Input
            disabled={applied ? true : false}
            type="text"
            placeholder="Promo code (if any)..."
            className={`w-full h-11 rounded-xl bg-slate-50/70 border-slate-200 text-sm focus-visible:bg-white focus-visible:ring-primary/20 focus-visible:border-primary ${
              errors.promoCode ? "ring-destructive" : ""
            }`}
            {...register("promoCode")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
        </div>
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="h-11 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center shrink-0"
          disabled={loading || applied}
        >
          {applied ? "Applied" : "Apply"}
          {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
      {errors.promoCode && (
        <span className="text-destructive text-xs mt-1 block">
          {errors.promoCode.message}
        </span>
      )}
    </div>
  );
}
