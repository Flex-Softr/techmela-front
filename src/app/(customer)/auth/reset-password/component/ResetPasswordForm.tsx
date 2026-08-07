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
    email: yup.string().required("Email is required"),
    otp: yup
      .string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits")
      .matches(/^[0-9]+$/, "OTP must be numeric"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
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
          title: "Success",
          description: "Your password has been changed successfully.",
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
        "Failed to reset password";

      toast({
        variant: "destructive",
        title: "Error",
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
              Reset password
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create a new secure password for your account
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
                Email
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
                OTP code
              </Label>
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
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
                New password
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
                      placeholder="At least 6 characters"
                      className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground group-hover:text-muted-foreground transition-colors"
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
                  Updating...
                </div>
              ) : (
                <span>Update password</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-muted/30 border-t border-border text-sm text-muted-foreground">
          <p>
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-primary hover:underline transition-all"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
