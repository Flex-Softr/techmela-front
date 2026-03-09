"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/redux/features/auth/interface";
import { useAppDispatch } from "@/redux/hooks";
import decodeJWT from "@/utilities/decodeJWT";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const user = decodeJWT(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        className: "bg-green-500 text-white",
        title: "Login Successful",
        description: res.message,
      });
      router.push("/");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          err?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50/50">
      <Card className="max-w-[450px] w-full shadow-md border-gray-200/60 overflow-hidden bg-white">
        <CardHeader className="space-y-4 pb-6 border-b border-gray-50 bg-gray-50/30">
          <div className="flex justify-center mb-2">
            <Link href="/">
              <Image
                src="/images/logo/Logo.png"
                alt="Siddikiaprokashoni Logo"
                width={180}
                height={50}
                className="h-auto w-auto object-contain transition-transform hover:scale-105 duration-300"
                priority
              />
            </Link>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <LogIn className="w-6 h-6 text-primary" />
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-500">
              Please enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8 px-8">
          <form
            id="login-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label
                htmlFor="phoneEmailOrUid"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </Label>
              <Input
                id="phoneEmailOrUid"
                type="tel"
                placeholder="01XXXXXXXXX"
                className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg ${errors.phoneEmailOrUid ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                {...register("phoneEmailOrUid", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneEmailOrUid && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.phoneEmailOrUid.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </Label>
                <Link
                  href="/auth/forget-password"
                  className="text-xs font-semibold text-primary hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  {...register("password", {
                    required: "Password is required",
                  })}
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
                <p className="text-xs text-red-500 font-medium">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/registration"
              className="font-bold text-primary hover:underline transition-all"
            >
              Create Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
