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
import DivisionDistrictUpazilaSelector from "@/app/(public)/checkout/components/DivisionDistrictSelector";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^(?:\+88)?01[3-9]\d{8}$/, "Invalid phone number"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
  address: yup
    .object()
    .shape({
      division: yup.string().required("Division is required"),
      district: yup.string().required("District is required"),
      upazila: yup.string().required("Thana / Upazila is required"),
      fullAddress: yup.string().required("Full address is required"),
    })
    .required("Address is required"),
  personalInfo: yup
    .object()
    .shape({
      fullName: yup.string().required("Full name is required"),
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    })
    .required("Personal information is required"),
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
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      address: {
        division: "",
        district: "",
        upazila: "",
        fullAddress: "",
      },
      personalInfo: {
        fullName: "",
        email: "",
      },
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createCustomer(data).unwrap();
      if (!res.data) throw new Error("No data returned from server");
      const user = decodeJWT(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        className: "bg-success/100 text-primary-foreground",
        title: "Registration successful",
        description: res.message,
      });
      router.push("/");
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
        "Please check your details and try again.";

      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-3 py-4 bg-muted/50">
      <Card className="max-w-[650px] w-full shadow-sm border-border/60 overflow-hidden bg-background">
        <CardHeader className="space-y-1 pb-3 border-b border-border bg-muted/30">
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <UserPlus className="w-6 h-6 text-primary" />
              Create a new account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join ShajGhor to start shopping
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4 px-6">
          <form
            id="register-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-foreground"
                >
                  Full name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your name"
                  className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg ${errors.personalInfo?.fullName ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  {...register("personalInfo.fullName")}
                />
                {errors.personalInfo?.fullName && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.personalInfo.fullName.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground"
                >
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg ${errors.personalInfo?.email ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  {...register("personalInfo.email")}
                />
                {errors.personalInfo?.email && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.personalInfo.email.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-semibold text-foreground"
                >
                  Phone number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg ${errors.phoneNumber ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-destructive font-medium">
                    {errors.phoneNumber.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-foreground"
                >
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg pr-10 ${errors.password ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground group-hover:text-muted-foreground transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive font-medium line-clamp-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <DivisionDistrictUpazilaSelector
              control={control}
              register={register}
              setValue={setValue}
              errors={errors}
              basePath="address"
            />

            <div className="space-y-2">
              <Label
                htmlFor="fullAddress"
                className="text-sm font-semibold text-foreground"
              >
                Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullAddress"
                type="text"
                placeholder="City, area, street..."
                className={`h-11 border-border focus:ring-primary/20 transition-all rounded-lg ${errors.address?.fullAddress ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
                {...register("address.fullAddress")}
              />
              {errors.address?.fullAddress && (
                <p className="text-xs text-destructive font-medium">
                  {errors.address.fullAddress.message as string}
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
                  Creating account...
                </div>
              ) : (
                <span>Create account</span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-6 pt-4 flex flex-col items-center gap-4 bg-muted/30 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
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

export default RegisterForm;
