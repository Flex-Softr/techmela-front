"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Save } from "lucide-react";

type ChangePasswordFormData = {
  previousPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [showPreviousPassword, setShowPreviousPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const result = await changePassword(data).unwrap();
      const message = result.message;
      toast({
        description: message,
        className: "text-green-500",
      });
      reset();
      router.push("/my-account");
    } catch (err) {
      if (err instanceof Error && err.message) {
        toast({
          description: err.message,
          className: "text-red-500",
        });
      } else {
        toast({
          title: "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে",
          description: "পুরানো পাসওয়ার্ডটি মিলেনি!",
          variant: "destructive",
        });
      }
    }
  };

  const renderError = (error: FieldError | undefined) => {
    if (!error) return null;
    return (
      <p className="text-xs text-red-500 mt-1 font-medium">{error.message}</p>
    );
  };

  return (
    <Card className="w-full shadow-sm border-gray-200/60 max-w-md mx-auto">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2 font-hind-siliguri">
          <Lock className="w-5 h-5 text-primary" />
          পাসওয়ার্ড পরিবর্তন করুন
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          id="change-password-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2 relative">
            <label
              htmlFor="previousPassword"
              className="text-sm font-semibold text-gray-700 font-hind-siliguri"
            >
              বর্তমান পাসওয়ার্ড
            </label>
            <div className="relative">
              <Input
                {...register("previousPassword", {
                  required: "বর্তমান পাসওয়ার্ড প্রয়োজন",
                })}
                type={showPreviousPassword ? "text" : "password"}
                id="previousPassword"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
                placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
              />
              <button
                type="button"
                onClick={() => setShowPreviousPassword(!showPreviousPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={
                  showPreviousPassword ? "Hide password" : "Show password"
                }
              >
                {showPreviousPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {renderError(errors.previousPassword)}
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="newPassword"
              className="text-sm font-semibold text-gray-700 font-hind-siliguri"
            >
              নতুন পাসওয়ার্ড
            </label>
            <div className="relative">
              <Input
                {...register("newPassword", {
                  required: "নতুন পাসওয়ার্ড প্রয়োজন",
                  minLength: {
                    value: 4,
                    message: "পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে",
                  },
                })}
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg pr-10"
                placeholder="আপনার নতুন পাসওয়ার্ড লিখুন"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {renderError(errors.newPassword)}
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-700 font-hind-siliguri"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  required: "অনুগ্রহ করে আপনার নতুন পাসওয়ার্ডটি নিশ্চিত করুন",
                  validate: (value) =>
                    value === newPassword || "পাসওয়ার্ড দুটি মিলেনি",
                })}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg pr-10"
                placeholder="পাসওয়ার্ডটি আবার লিখুন"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {renderError(errors.confirmPassword)}
          </div>
        </form>
      </CardContent>

      <CardFooter className="pt-4 pb-6 flex justify-end">
        <Button
          form="change-password-form"
          type="submit"
          className="w-full sm:w-auto min-w-[120px] flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="font-hind-siliguri">সংরক্ষণ করা হচ্ছে...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span className="font-hind-siliguri">পাসওয়ার্ড সংরক্ষণ করুন</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
