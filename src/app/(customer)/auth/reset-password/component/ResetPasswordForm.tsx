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
import TGenericResponse from "@/types/response";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("ইমেইল দেওয়া আবশ্যক"),
    otp: yup
      .string()
      .required("ওটিপি দেওয়া আবশ্যক")
      .length(6, "ওটিপি ৬ ডিজিটের হতে হবে")
      .matches(/^[0-9]+$/, "ওটিপি শুধুমাত্র সংখ্যা হতে হবে"),
    password: yup
      .string()
      .required("পাসওয়ার্ড দেওয়া আবশ্যক")
      .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await resetPassword({
        email: email,
        otp: data.otp,
        newPassword: data.password,
      }).unwrap()) as TGenericResponse;

      if (res.success) {
        toast({
          className: "bg-success text-primary-foreground",
          title: "সফল হয়েছে",
          description: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
        });
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      const err = error as {
        data?: {
          message?: string;
          errorMessages?: { path: string; message: string }[];
        };
      };

      const errorMessage =
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        "পাসওয়ার্ড রিসেট করতে ব্যর্থ হয়েছে";

      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-3 py-4 bg-muted/50">
      <Card className="max-w-[450px] w-full shadow-sm border-border/60 overflow-hidden bg-background">
        <CardHeader className="space-y-2 pb-4 border-b border-border bg-muted/30">
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              পাসওয়ার্ড রিসেট করুন
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              আপনার অ্যাকাউন্টের জন্য নতুন একটি নিরাপদ পাসওয়ার্ড দিন
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                ইমেইল
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="text"
                    disabled
                    className="h-11 border-border bg-muted transition-all rounded-lg opacity-80 cursor-not-allowed"
                  />
                )}
              />
              {errors.email && (
                <p className="text-xs text-destructive font-medium italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="otp"
                className="text-sm font-semibold text-foreground"
              >
                ওটিপি কোড
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
                    className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg ${errors.otp ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  />
                )}
              />
              {errors.otp && (
                <p className="text-xs text-destructive font-medium italic">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
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
                      placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                      className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground group-hover:text-muted-foreground transition-colors"
                  aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive font-medium leading-tight">
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
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  আপডেট হচ্ছে...
                </div>
              ) : (
                <span>পাসওয়ার্ড পরিবর্তন করুন</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-muted/30 border-t border-border text-sm text-muted-foreground">
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
