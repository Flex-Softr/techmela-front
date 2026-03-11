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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("ফোন নম্বর প্রয়োজন")
    .matches(/^[0-9+]+$/, "অকার্যকর ফোন নম্বর")
    .max(15, "অকার্যকর ফোন নম্বর"),
  password: yup
    .string()
    .required("পাসওয়ার্ড প্রয়োজন")
    .min(6, "পাসওয়ার্ড অন্তত ৬টি অক্ষর হতে হবে")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "অন্তত একটি বড় হাতের অক্ষর এবং একটি বিশেষ অক্ষর (!@#$%^&*) থাকতে হবে"
    ),
  address: yup
    .object()
    .shape({
      fullAddress: yup.string().required("বিস্তারিত ঠিকানা প্রয়োজন"),
    })
    .required("ঠিকানা প্রয়োজন"),
  personalInfo: yup
    .object()
    .shape({
      fullName: yup.string().required("পুরো নাম প্রয়োজন"),
    })
    .required("ব্যক্তিগত তথ্য প্রয়োজন"),
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
      if (!res.data) throw new Error("No data returned from server");
      const user = decodeJWT(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        className: "bg-green-500 text-white font-hind-siliguri",
        title: "নিবন্ধন সফল হয়েছে",
        description: res.message,
      });
      router.push("/");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast({
        variant: "destructive",
        title: "নিবন্ধন ব্যর্থ হয়েছে",
        description:
          err?.data?.message || "অনুগ্রহ করে আপনার তথ্যগুলো পুনরায় চেক করুন।",
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-3 py-4 bg-gray-50/50">
      <Card className="max-w-[500px] w-full shadow-sm border-gray-200/60 overflow-hidden bg-white">
        <CardHeader className="space-y-2 pb-4 border-b border-gray-50 bg-gray-50/30">
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 font-hind-siliguri">
              <UserPlus className="w-6 h-6 text-primary" />
              নতুন অ্যাকাউন্ট তৈরি করুন
            </CardTitle>
            <CardDescription className="text-gray-500 font-hind-siliguri">
              বইয়ের জগতে আপনার যাত্রা শুরু করতে আমাদের সাথে যুক্ত হন
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <form
            id="register-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                পুরো নাম
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="আপনার পুরো নাম লিখুন"
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
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                ফোন নম্বর
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="০১XXXXXXXXX"
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
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                বিস্তারিত ঠিকানা
              </Label>
              <Input
                id="fullAddress"
                type="text"
                placeholder="শহর, এলাকা, রাস্তা..."
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
                className="text-sm font-semibold text-gray-700 font-hind-siliguri"
              >
                পাসওয়ার্ড
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="অন্তত ৬টি অক্ষর"
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
                <div className="flex items-center gap-2 font-hind-siliguri">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </div>
              ) : (
                <span className="font-hind-siliguri">অ্যাকাউন্ট তৈরি করুন</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50">
          <p className="text-sm text-gray-600 font-hind-siliguri">
            ইতিমধ্যেই অ্যাকাউন্ট আছে?{" "}
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

export default RegisterForm;
