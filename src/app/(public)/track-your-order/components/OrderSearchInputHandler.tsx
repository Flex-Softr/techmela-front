"use client";
import EcButton from "@/components/shared/EcButton/EcButton";
import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Define the form data type
type FormData = {
  orderId: string;
};

const OrderSearchInputHandler = () => {
  const router = useRouter();

  // Specify the type for useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    router.push(`/track-your-order/${data.orderId}`);
  };

  return (
    <section className="py-6 bg-muted/50 min-h-[80vh] flex items-center">
      <ContainerMax>
        <div className="max-w-xl mx-auto bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border/50">
          <div className="text-center mb-7">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              অর্ডার ট্র্যাক করুন
            </h2>
            <p className="text-muted-foreground">
              আপনার পার্সেলের বর্তমান অবস্থান জানতে অর্ডার আইডি লিখুন
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="orderId"
                className="block text-sm font-medium text-foreground px-1"
              >
                অর্ডার আইডি
              </label>
              <Input
                {...register("orderId", { required: true })}
                id="orderId"
                className="w-full h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-all text-lg font-mono placeholder:font-sans"
                type="text"
                placeholder="অর্ডার কনফার্মেশনের মেসেজে প্রাপ্ত আইডি দিন"
              />
              {errors.orderId && (
                <span className="text-destructive text-xs font-medium px-1">
                  অনুগ্রহ করে একটি সঠিক অর্ডার আইডি লিখুন
                </span>
              )}
            </div>

            <EcButton
              className="w-full h-12 text-primary-foreground text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              type="submit"
            >
              ট্র্যাক করুন
            </EcButton>
          </form>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            অর্ডার আইডি খুঁজে পাচ্ছেন না? আমাদের হেল্পলাইনে যোগাযোগ করুন।
          </p>

          <div className="space-y-2 mt-5 text-center">
            <p className="text-lg md:text-xl font-bold text-foreground">
              অথবা মোবাইল নম্বর দিয়ে অর্ডার চেক করুন
            </p>
            <Button onClick={() => router.push("/orders")}>সকল অর্ডার দেখুন</Button>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
};

export default OrderSearchInputHandler;
