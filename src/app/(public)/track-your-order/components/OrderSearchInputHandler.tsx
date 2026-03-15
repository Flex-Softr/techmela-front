"use client";
import EcButton from "@/components/EcButton/EcButton";
import ContainerMax from "@/components/containerMax/ContainerMax";
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
    <section className="py-6 bg-gray-50/50 min-h-[80vh] flex items-center">
      <ContainerMax>
        <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-border/50">
          <div className="text-center mb-7">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              অর্ডার ট্র্যাক করুন
            </h2>
            <p className="text-muted-foreground">
              অর্ডার আইডি ব্যবহার করে আপনার পার্সেলের সর্বশেষ অবস্থা জানুন
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
                className="w-full h-12 rounded-xl border-border/60 bg-gray-50/30 focus:bg-white transition-all text-lg font-mono placeholder:font-sans"
                type="text"
                placeholder="অর্ডার নিশ্চিতকরণ মেসেজ থেকে আইডিটি দিন"
              />
              {errors.orderId && (
                <span className="text-destructive text-xs font-medium px-1">
                  একটি বৈধ অর্ডার আইডি দিন
                </span>
              )}
            </div>

            <EcButton
              className="w-full h-12 text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              type="submit"
            >
              ট্র্যাকিং শুরু করুন
            </EcButton>
          </form>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            আইডি খুঁজে পাচ্ছেন না? অনুগ্রহ করে আমাদের হেল্পলাইনে যোগাযোগ করুন।
          </p>
        </div>
      </ContainerMax>
    </section>
  );
};

export default OrderSearchInputHandler;
