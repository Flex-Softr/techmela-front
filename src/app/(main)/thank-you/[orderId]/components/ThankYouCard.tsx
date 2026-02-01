"use client";

import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useSingleOrderQuery } from "@/redux/features/order/orderApi";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import CustomerDetails from "./CustomerDetails";
import OrderSummary from "./OrderSummary";
import ThankYouHeader from "./ThankYouHeader";

const ThankYouCard = ({ orderId }: { orderId?: string }) => {
  const { data, isLoading } = useSingleOrderQuery({ id: orderId });
  const orderInfo = data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h2 className="text-xl font-medium text-muted-foreground">
          Loading your order details...
        </h2>
      </div>
    );
  }

  if (!orderInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <ErrorMessage
          className="text-center py-3 block text-red-500 font-medium"
          message="We couldn't locate the order details you're looking for. It's possible the order ID is incorrect or the order has been removed."
        />
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <ThankYouHeader orderId={orderInfo.orderId} status={orderInfo.status} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Order Details */}
        <div className="lg:col-span-2 space-y-5">
          <OrderSummary orderInfo={orderInfo} />
        </div>

        {/* Right Column: Customer & Delivery Info */}
        <div className="">
          <CustomerDetails orderInfo={orderInfo} />
        </div>
      </div>
    </div>
  );
};

export default ThankYouCard;
