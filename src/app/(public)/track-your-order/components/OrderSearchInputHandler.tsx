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
              Track Your Order
            </h2>
            <p className="text-muted-foreground">
              Use your order ID to check the latest status of your parcel
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="orderId"
                className="block text-sm font-medium text-foreground px-1"
              >
                Order ID
              </label>
              <Input
                {...register("orderId", { required: true })}
                id="orderId"
                className="w-full h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-all text-lg font-mono placeholder:font-sans"
                type="text"
                placeholder="Enter the ID from your order confirmation message"
              />
              {errors.orderId && (
                <span className="text-destructive text-xs font-medium px-1">
                  Please enter a valid order ID
                </span>
              )}
            </div>

            <EcButton
              className="w-full h-12 text-primary-foreground text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              type="submit"
            >
              Start Tracking
            </EcButton>
          </form>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Can&apos;t find your ID? Please contact our helpline.
          </p>

          <div className="space-y-2 mt-5 text-center">
            <p className="text-2xl font-bold">
              Or check order status with your mobile number
            </p>
            <Button onClick={() => router.push("/orders")}>Check Orders</Button>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
};

export default OrderSearchInputHandler;
