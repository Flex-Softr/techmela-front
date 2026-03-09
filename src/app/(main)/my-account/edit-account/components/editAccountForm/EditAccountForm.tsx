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
import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "@/redux/features/user/userApi";
import { User, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
};

const EditAccountForm = () => {
  const { data } = useGetUserDataQuery({});

  const {
    email: initialEmail = "",
    fullName: initialFullName = "",
    phoneNumber: initialPhoneNumber = "",
    address: { fullAddress: initialFullAddress = "" } = {},
  } = data?.data || {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const [updateUserData] = useUpdateUserDataMutation();
  const { toast } = useToast();

  useEffect(() => {
    setValue("fullName", initialFullName);
    setValue("email", initialEmail);
    setValue("phoneNumber", initialPhoneNumber);
    setValue("fullAddress", initialFullAddress);
  }, [
    initialFullName,
    initialEmail,
    initialPhoneNumber,
    initialFullAddress,
    setValue,
  ]);

  const onSubmit = async (formData: FormData) => {
    const updateData: Partial<FormData> = {};

    if (formData.fullName !== initialFullName) {
      updateData.fullName = formData.fullName;
    }
    if (formData.email !== initialEmail) {
      updateData.email = formData.email;
    }
    if (formData.phoneNumber !== initialPhoneNumber) {
      updateData.phoneNumber = formData.phoneNumber;
    }
    if (formData.fullAddress !== initialFullAddress) {
      updateData.fullAddress = formData.fullAddress;
    }

    try {
      if (Object.keys(updateData).length > 0) {
        await updateUserData({
          ...updateData,
          personalInfo: {
            fullName: updateData.fullName || initialFullName,
          },
          address: {
            fullAddress: updateData.fullAddress || initialFullAddress,
          },
        }).unwrap();
        toast({
          description: "Update successful",
          className: "text-green-500",
        });
      } else {
        toast({
          description: "No changes to update",
          className: "text-yellow-500",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "Error updating account information";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = (error as { message: string }).message;
      }
      toast({
        description: errorMessage,
        className: "text-red-500",
      });
    }
  };

  return (
    <Card className="w-full shadow-sm border-gray-200/60 max-w-4xl mx-auto">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Edit Account Information
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-8">
        <form id="edit-account-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <Input
                type="text"
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your full name"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <Input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber")}
                placeholder="Enter your phone number"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="example@example.com"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="fullAddress"
                className="text-sm font-semibold text-gray-700"
              >
                Home Address
              </label>
              <Input
                type="text"
                id="fullAddress"
                {...register("fullAddress")}
                placeholder="Enter your address"
                className="h-11 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all rounded-lg"
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="pt-6 pb-8 border-t border-gray-100 bg-gray-50/50 rounded-b-xl flex justify-end">
        <Button
          form="edit-account-form"
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[140px] flex items-center gap-2"
        >
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditAccountForm;
