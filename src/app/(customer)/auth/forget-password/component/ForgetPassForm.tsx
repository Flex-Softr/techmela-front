"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/components/ui/use-toast";
import TGenericResponse, { TGenericErrorResponse } from "@/types/response";

const ForgetPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await forgetPassword({
        phoneNumber: data.number,
      }).unwrap()) as TGenericResponse;

      if (res.success) {
        toast({
          className: "bg-green-600 text-white font-hind-siliguri",
          title: "সফল",
          description: "আপনার ফোন নম্বরে OTP পাঠানো হয়েছে।",
        });
        // Redirect to reset password with the phone number pre-filled.
        router.push(`/auth/reset-password?phone=${data.number}`);
      }
    } catch (error) {
      const err = error as TGenericErrorResponse;
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: err?.message || "রিসেট লিংক পাঠাতে ব্যর্থ হয়েছে",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-3 py-4 bg-gray-50/50">
      <Card className="max-w-[450px] w-full shadow-sm border-gray-200/60 overflow-hidden bg-white">
        <CardHeader className="space-y-2 pb-4 border-b border-gray-50 bg-gray-50/30">
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 font-hind-siliguri">
              <Fingerprint className="w-6 h-6 text-primary" />
              পাসওয়ার্ড ভুলে গেছেন?
            </CardTitle>
            <CardDescription className="text-gray-500 px-4 font-hind-siliguri">
              আপনার অ্যাকাউন্টের সাথে যুক্ত ফোন নম্বরটি লিখুন। আমরা আপনাকে
              পাসওয়ার্ড রিসেট করতে সাহায্য করব।
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="number"
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                ফোন নম্বর
              </Label>
              <Controller
                name="number"
                control={control}
                rules={{ required: "ফোন নম্বর প্রয়োজন" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="number"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg ${errors.number ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  />
                )}
              />
              {errors.number && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.number.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 font-hind-siliguri">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  পাঠানো হচ্ছে...
                </div>
              ) : (
                <span className="font-hind-siliguri">পাসওয়ার্ড রিসেট করুন</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-all mt-2 font-hind-siliguri"
          >
            <ArrowLeft className="w-4 h-4" />
            লগইন-এ ফিরে যান
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPasswordForm;
