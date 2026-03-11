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
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useToast } from "@/components/ui/use-toast";
import TGenericResponse, { TGenericErrorResponse } from "@/types/response";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    PhoneNumber: yup.string().required("ফোন নম্বর প্রয়োজন"),
    otp: yup
      .string()
      .required("ওটিপি (OTP) প্রয়োজন")
      .length(6, "ওটিপি অবশ্যই ৬ ডিজিটের হতে হবে")
      .matches(/^[0-9]+$/, "ওটিপি অবশ্যই সংখ্যা হতে হবে"),
    password: yup
      .string()
      .required("পাসওয়ার্ড প্রয়োজন")
      .min(6, "পাসওয়ার্ড অন্তত ৬টি অক্ষর হতে হবে")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে"
      ),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      PhoneNumber: "",
      otp: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  useEffect(() => {
    if (phone) {
      setValue("PhoneNumber", phone);
    }
  }, [phone, setValue]);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await resetPassword({
        phoneNumber: data.PhoneNumber,
        otp: data.otp,
        newPassword: data.password,
      }).unwrap()) as TGenericResponse;

      if (res.success) {
        toast({
          className: "bg-green-600 text-white font-hind-siliguri",
          title: "সফল",
          description: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      const err = error as TGenericErrorResponse;
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: err?.message || "পাসওয়ার্ড রিসেট করতে ব্যর্থ হয়েছে",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-3 py-4 bg-gray-50/50">
      <Card className="max-w-[450px] w-full shadow-sm border-gray-200/60 overflow-hidden bg-white">
        <CardHeader className="space-y-2 pb-4 border-b border-gray-50 bg-gray-50/30">
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 font-hind-siliguri">
              <Lock className="w-6 h-6 text-primary" />
              পাসওয়ার্ড রিসেট করুন
            </CardTitle>
            <CardDescription className="text-gray-500 font-hind-siliguri">
              আপনার একাউন্টের জন্য একটি নতুন নিরাপদ পাসওয়ার্ড তৈরি করুন
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="PhoneNumber"
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                ফোন নম্বর
              </Label>
              <Controller
                name="PhoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="PhoneNumber"
                    type="text"
                    disabled
                    className="h-11 border-gray-200 bg-gray-50 transition-all rounded-lg opacity-80 cursor-not-allowed"
                  />
                )}
              />
              {errors.PhoneNumber && (
                <p className="text-xs text-red-500 font-medium italic">
                  {errors.PhoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="otp"
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                ওটিপি (OTP) কোড
              </Label>
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="otp"
                    type="text"
                    placeholder="৬ ডিজিটের ওটিপি লিখুন"
                    className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg font-hind-siliguri ${errors.otp ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  />
                )}
              />
              {errors.otp && (
                <p className="text-xs text-red-500 font-medium italic">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                নতুন পাসওয়ার্ড
              </Label>
              <div className="relative group">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="অন্তত ৬টি অক্ষর"
                      className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg pr-10 font-hind-siliguri ${errors.password ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium leading-tight">
                  {errors.password.message}
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
                  আপডেট হচ্ছে...
                </div>
              ) : (
                <span className="font-hind-siliguri">পাসওয়ার্ড আপডেট করুন</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50 text-sm text-gray-600 font-hind-siliguri">
          <p>
            পাসওয়ার্ড মনে পড়েছে?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-primary hover:underline transition-all"
            >
              লগইন করুন
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
