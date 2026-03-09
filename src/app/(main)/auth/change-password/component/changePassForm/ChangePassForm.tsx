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
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Save } from "lucide-react";

type ChangePasswordFormData = {
  previousPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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
    } catch (err) {
      if (err instanceof Error && err.message) {
        toast({
          description: err.message,
          className: "text-red-500",
        });
      } else {
        toast({
          title: "Failed to Change Password",
          description: "The previous password did not match!",
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
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Change Password
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          id="change-password-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="previousPassword"
              className="text-sm font-semibold text-gray-700"
            >
              Current Password
            </label>
            <Input
              {...register("previousPassword", {
                required: "Current Password is required",
              })}
              type="password"
              id="previousPassword"
              className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
              placeholder="Enter your current password"
            />
            {renderError(errors.previousPassword)}
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="newPassword"
              className="text-sm font-semibold text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*]).{8,}$/,
                    message: "Must include: A-Z, a-z, 0-9, and @#$%&*",
                  },
                })}
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg pr-10"
                placeholder="Enter your new password"
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
              className="text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg pr-10"
                placeholder="Confirm your new password"
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
            "Saving..."
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Password
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordForm;
