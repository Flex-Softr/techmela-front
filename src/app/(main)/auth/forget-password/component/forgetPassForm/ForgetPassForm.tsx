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
import { ArrowLeft, Fingerprint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const ForgetPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
              <Fingerprint className="w-6 h-6 text-primary" />
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-gray-500 px-4">
              Enter the phone number associated with your account and we&apos;ll
              help you reset it.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-8 px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="number"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </Label>
              <Controller
                name="number"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="number"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className={`h-11 border-gray-200 focus:ring-primary/20 transition-all rounded-lg ${errors.number ? "border-red-500 focus:border-red-500" : "focus:border-primary"}`}
                  />
                )}
              />
              {errors.number && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.number.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Reset Password
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-4 flex flex-col items-center gap-4 bg-gray-50/30 border-t border-gray-50">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-all mt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPasswordForm;
