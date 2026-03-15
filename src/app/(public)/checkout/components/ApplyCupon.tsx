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
          title: "কুপন সফলভাবে প্রয়োগ করা হয়েছে",
          action: <ToastAction altText="Thanks">ধন্যবাদ</ToastAction>,
          style: {
            backgroundColor: "green",
            color: "#fff",
          },
        });
      } else {
        const errorMessage = appliedCoupon?.errorMessages?.[0]?.message;

        toast({
          variant: "destructive",
          title: errorMessage,
          action: (
            <ToastAction onClick={() => reset()} altText="Try again">
              আবার চেষ্টা করুন
            </ToastAction>
          ),
          style: {
            backgroundColor: "#ff4d4f",
            color: "#fff",
          },
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
        style: {
          backgroundColor: "#ff4d4f",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <div className="flex items-center space-x-2 md:space-x-6">
        <div className="w-full">
          <Input
            disabled={applied ? true : false}
            type="text"
            placeholder="যদি আপনার কাছে প্রোমো কোড থাকে, তবে এখানে লিখুন..."
            className={`w-full ${errors.promoCode ? "ring-red-500" : ""}`}
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
          className="bg-primary text-white flex items-center"
          disabled={loading || applied}
        >
          {applied ? "Applied" : "Apply"}
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
      {errors.promoCode && (
        <span className="text-red-500 text-sm">{errors.promoCode.message}</span>
      )}
    </div>
  );
}
