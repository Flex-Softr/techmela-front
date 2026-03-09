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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    PhoneNumber: yup.string().required("Email or phone number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      PhoneNumber: "017XXXXXX",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gray-50/50">
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
              <Lock className="w-6 h-6 text-primary" />
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-500">
              Create a new secure password for your account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8 px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="PhoneNumber"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
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
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                New Password
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
                      className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
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
              className="w-full h-11 text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Update Password
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50 text-sm text-gray-600">
          <p>
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-primary hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
