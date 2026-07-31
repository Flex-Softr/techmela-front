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
        className: "bg-success text-primary-foreground font-hind-siliguri",
        title: "লগইন সফল হয়েছে",
        description: "স্বাগতম! আপনি সফলভাবে লগইন করেছেন।",
      });
      router.push("/dashboard");
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
        "লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে আপনার তথ্যগুলো পুনরায় চেক করুন।";

      toast({
        variant: "destructive",
        title: "লগইন ব্যর্থ হয়েছে",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex justify-center px-3 py-4 bg-muted/50">
      <Card className="max-w-[450px] w-full shadow-sm border-border/60 overflow-hidden bg-background">
        <CardHeader className="space-y-2 pb-4 border-b border-border bg-muted/30">
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2 font-hind-siliguri">
              <LogIn className="w-6 h-6 text-primary" />
              আবার স্বাগতম
            </CardTitle>
            <CardDescription className="text-muted-foreground font-hind-siliguri">
              আপনার একাউন্টে প্রবেশ করতে তথ্য প্রদান করুন
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6 px-6">
          <form
            id="login-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label
                htmlFor="phoneEmailOrUid"
                className="text-sm font-semibold text-foreground font-hind-siliguri"
              >
                ইমেইল অথবা ফোন নম্বর
              </Label>
              <Input
                id="phoneEmailOrUid"
                type="text"
                placeholder="ইমেইল অথবা ফোন নম্বর"
                className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg ${errors.phoneEmailOrUid ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                {...register("phoneEmailOrUid", {
                  required: "ইমেইল অথবা ফোন নম্বর প্রয়োজন",
                })}
              />
              {errors.phoneEmailOrUid && (
                <p className="text-xs text-destructive font-medium">
                  {errors.phoneEmailOrUid.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground font-hind-siliguri"
                >
                  পাসওয়ার্ড
                </Label>
                <Link
                  href="/auth/forget-password"
                  className="text-xs font-semibold text-primary hover:underline transition-all font-hind-siliguri"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  {...register("password", {
                    required: "পাসওয়ার্ড প্রয়োজন",
                  })}
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
                <p className="text-xs text-destructive font-medium">
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
                <div className="flex items-center gap-2 font-hind-siliguri">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  লগইন হচ্ছে...
                </div>
              ) : (
                <span className="font-hind-siliguri">লগইন করুন</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-muted/30 border-t border-border">
          <p className="text-sm text-muted-foreground font-hind-siliguri">
            একাউন্ট নেই?{" "}
            <Link
              href="/auth/registration"
              className="font-bold text-primary hover:underline transition-all"
            >
              নতুন একাউন্ট তৈরি করুন
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
