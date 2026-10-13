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
        className: "text-success",
      });
      reset();
      router.push("/my-account");
    } catch (err) {
      if (err instanceof Error && err.message) {
        toast({
          description: err.message,
          className: "text-destructive",
        });
      } else {
        toast({
          title: "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে",
          description: "বর্তমান পাসওয়ার্ডটি সঠিক নয়!",
          variant: "destructive",
        });
      }
    }
  };

  const renderError = (error: FieldError | undefined) => {
    if (!error) return null;
    return (
      <p className="text-xs text-destructive mt-1 font-medium">
        {error.message}
      </p>
    );
  };

  return (
    <Card className="w-full shadow-sm border-border/60 max-w-md mx-auto">
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
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
              className="text-sm font-semibold text-foreground"
            >
              বর্তমান পাসওয়ার্ড
            </label>
            <div className="relative">
              <Input
                {...register("previousPassword", {
                  required: "বর্তমান পাসওয়ার্ড দেওয়া আবশ্যক",
                })}
                type={showPreviousPassword ? "text" : "password"}
                id="previousPassword"
                className="h-11 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
                placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
              />
              <button
                type="button"
                onClick={() => setShowPreviousPassword(!showPreviousPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-muted-foreground transition-colors"
                aria-label={
                  showPreviousPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
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
              className="text-sm font-semibold text-foreground"
            >
              নতুন পাসওয়ার্ড
            </label>
            <div className="relative">
              <Input
                {...register("newPassword", {
                  required: "নতুন পাসওয়ার্ড দেওয়া আবশ্যক",
                  minLength: {
                    value: 4,
                    message: "পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে",
                  },
                })}
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="h-11 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg pr-10"
                placeholder="নতুন পাসওয়ার্ড লিখুন"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-muted-foreground transition-colors"
                aria-label={showNewPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
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
              className="text-sm font-semibold text-foreground"
            >
              নতুন পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  required: "নতুন পাসওয়ার্ডটি পুনরায় লিখুন",
                  validate: (value) =>
                    value === newPassword || "উভয় পাসওয়ার্ড মিলছে না",
                })}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="h-11 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg pr-10"
                placeholder="পাসওয়ার্ডটি আবার লিখুন"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-muted-foreground transition-colors"
                aria-label={
                  showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
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
            <span>সংরক্ষণ করা হচ্ছে...</span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>পাসওয়ার্ড সংরক্ষণ করুন</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
