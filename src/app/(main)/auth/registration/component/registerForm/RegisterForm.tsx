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
import { setUser } from "@/redux/features/auth/authSlice";
import { TUser } from "@/redux/features/auth/interface";
import { useCreateCustomerMutation } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import decodeJWT from "@/utilities/decodeJWT";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Mobile is required")
    .matches(/^[0-9+]+$/, "Invalid mobile number")
    .max(15, "Invalid mobile number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Must have one uppercase & one special char"
    ),
  address: yup
    .object()
    .shape({
      fullAddress: yup.string().required("Full address is required"),
    })
    .required("Address is required"),
  personalInfo: yup
    .object()
    .shape({
      fullName: yup.string().required("Full name is required"),
    })
    .required("Personal info is required"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createCustomer(data).unwrap();
      const user = decodeJWT(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        className: "bg-green-500 text-white",
        title: "Registration Successful",
        description: res.message,
      });
      router.push("/");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          err?.data?.message || "Please check your details and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50/50">
      <Card className="max-w-[500px] w-full shadow-md border-gray-200/60 overflow-hidden bg-white">
        <CardHeader className="space-y-4 pb-6 border-b border-gray-50 bg-gray-50/30">
          <div className="flex justify-center mb-2">
            <Link href="/">
              <Image
                src="/images/logo/Logo.png"
                alt="Siddikiaprokashoni Logo"
                width={160}
                height={45}
                className="h-auto w-auto object-contain transition-transform hover:scale-105 duration-300"
                priority
              />
            </Link>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-primary" />
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-500">
              Join us to start your literary journey
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8 px-8">
          <form
            id="register-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg ${errors.personalInfo?.fullName ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                {...register("personalInfo.fullName")}
              />
              {errors.personalInfo?.fullName && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.personalInfo.fullName.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="01XXXXXXXXX"
                className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg ${errors.phoneNumber ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.phoneNumber.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="fullAddress"
                className="text-sm font-semibold text-gray-700"
              >
                Full Address
              </Label>
              <Input
                id="fullAddress"
                type="text"
                placeholder="City, Area, Road..."
                className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg ${errors.address?.fullAddress ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                {...register("address.fullAddress")}
              />
              {errors.address?.fullAddress && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.address.fullAddress.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  {...register("password")}
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
                <p className="text-xs text-red-500 font-medium line-clamp-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Registering...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
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

export default RegisterForm;
