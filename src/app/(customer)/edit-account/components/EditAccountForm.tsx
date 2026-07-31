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
import { TUserProfile } from "@/types/user";
import { User, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import DivisionDistrictUpazilaSelector from "@/app/(public)/checkout/components/DivisionDistrictSelector";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: {
    division: string;
    district: string;
    upazila: string;
    fullAddress: string;
  };
};

const EditAccountForm = () => {
  const { data } = useGetUserDataQuery(undefined);

  const {
    email: rawEmail,
    fullName: rawFullName,
    phoneNumber: rawPhoneNumber,
    address,
  } = data?.data || {};

  const initialEmail = rawEmail || "";
  const initialFullName = rawFullName || "";
  const initialPhoneNumber = rawPhoneNumber || "";
  const initialDivision = address?.division || "";
  const initialDistrict = address?.district || "";
  const initialUpazila = address?.upazila || "";
  const initialFullAddress = address?.fullAddress || "";

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const [updateUserData] = useUpdateUserDataMutation();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", initialFullName);
    setValue("email", initialEmail);
    setValue("phoneNumber", initialPhoneNumber);
    setValue("address.division", initialDivision);
    setValue("address.district", initialDistrict);
    setValue("address.upazila", initialUpazila);
    setValue("address.fullAddress", initialFullAddress);
  }, [
    initialFullName,
    initialEmail,
    initialPhoneNumber,
    initialDivision,
    initialDistrict,
    initialUpazila,
    initialFullAddress,
    setValue,
  ]);

  const onSubmit = async (formData: FormData) => {
    const payload: Partial<TUserProfile> = {};

    if (formData.fullName !== initialFullName) {
      payload.fullName = formData.fullName;
    }
    if (formData.email !== initialEmail) {
      payload.email = formData.email;
    }
    if (formData.phoneNumber !== initialPhoneNumber) {
      payload.phoneNumber = formData.phoneNumber;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addressPayload: any = {};
    if (formData.address.division !== initialDivision) {
      addressPayload.division = formData.address.division;
    }
    if (formData.address.district !== initialDistrict) {
      addressPayload.district = formData.address.district;
    }
    if (formData.address.upazila !== initialUpazila) {
      addressPayload.upazila = formData.address.upazila;
    }
    if (formData.address.fullAddress !== initialFullAddress) {
      addressPayload.fullAddress = formData.address.fullAddress;
    }

    if (Object.keys(addressPayload).length > 0) {
      payload.address = {
        ...address,
        ...addressPayload,
      };
    }

    try {
      if (Object.keys(payload).length > 0) {
        await updateUserData(payload).unwrap();
        toast({
          description: "তথ্য সফলভাবে আপডেট করা হয়েছে",
          className: "text-success font-hind-siliguri",
        });
        router.push("/my-account");
      } else {
        toast({
          description: "পরিবর্তন করার মতো কিছু পাওয়া যায়নি",
          className: "text-yellow-500 font-hind-siliguri",
        });
      }
    } catch (error: unknown) {
      let errorMessage = "তথ্য আপডেট করতে সমস্যা হয়েছে";
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
        className: "text-destructive font-hind-siliguri",
      });
    }
  };

  return (
    <Card className="w-full shadow-sm border-border/60 max-w-4xl mx-auto font-hind-siliguri">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          অ্যাকাউন্ট তথ্য এডিট করুন
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 px-4">
        <form id="edit-account-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-foreground"
              >
                পুরো নাম
              </label>
              <Input
                type="text"
                id="fullName"
                {...register("fullName")}
                placeholder="আপনার নাম লিখুন"
                className="h-10 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-foreground"
              >
                ফোন নম্বর
              </label>
              <Input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber")}
                placeholder="আপনার ফোন নম্বর লিখুন"
                className="h-10 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                ইমেইল
              </label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="example@example.com"
                className="h-10 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <DivisionDistrictUpazilaSelector
                control={control}
                register={register}
                setValue={setValue}
                errors={errors}
                shipping={address || undefined}
                basePath="address"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="fullAddress"
                className="text-sm font-semibold text-foreground"
              >
                ঠিকানা
              </label>
              <Input
                type="text"
                id="fullAddress"
                {...register("address.fullAddress")}
                placeholder="আপনার বর্তমান ঠিকানা লিখুন"
                className="h-10 border-border focus:border-primary focus:ring-primary/20 transition-all rounded-lg text-sm"
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="pt-4 pb-6 px-4 border-t border-border bg-muted/50 rounded-b-xl flex justify-end">
        <Button
          form="edit-account-form"
          type="submit"
          size="sm"
          disabled={isSubmitting}
          className="w-full sm:w-auto h-10 px-8 flex items-center gap-2 font-bold"
        >
          {isSubmitting ? (
            "সেভ হচ্ছে..."
          ) : (
            <>
              <Save className="w-4 h-4" />
              তথ্য সেভ করুন
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditAccountForm;
