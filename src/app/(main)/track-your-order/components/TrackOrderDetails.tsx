/* eslint-disable react/no-unescaped-entities */
"use client";

import ContainerMax from "@/components/containerMax/ContainerMax";
import EcButton from "@/components/EcButton/EcButton";
import { useOderTrackerQuery } from "@/redux/features/trackOrder/TrackOrder";
import { MapPin, Phone, User, Package, Truck, ArrowLeft } from "lucide-react";
import Timeline from "./Timeline";
import { useParams, useRouter } from "next/navigation";

// type Shipping = {
//   fullAddress: string;
//   fullName: string;
//   phoneNumber: string;
// }

type StatusEvent = {
  createdAt: string;
  description: {
    bn: string;
    en: string;
  };
  status: string;
};

// type OrderData = {
//   _id: string;
//   parcelTrackingLink: string | null;
//   shipping: Shipping;
//   status: string;
//   statusHistory: StatusEvent[];
//   message: string;
//   statusCode: number;
//   success: boolean;
// }
// Utility function to capitalize each word in the status
const capitalizeStatus = (status: string) => {
  return status
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
const TrackOrderDetails = () => {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const { orderId } = params;

  const { data, error, isLoading } = useOderTrackerQuery(orderId);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-lg text-muted-foreground animate-pulse">
        অর্ডার তথ্য লোড হচ্ছে...
      </p>
    </div>
  );

  const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="text-center py-4 my-10 md:my-16">
      <p className="text-red-500 text-md md:text-2xl">{message}</p>
      <EcButton
        onClick={() => router.back()}
        className="mt-4 px-6 py-1 text-white transition"
      >
        Go Back
      </EcButton>
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data || !data?.success) {
    return <ErrorDisplay message="Invalid order ID, Order not found" />;
  }

  const orderData = data?.data;

  // Check if statusHistory is present and is an array
  const statuses = Array.isArray(orderData.statusHistory)
    ? orderData.statusHistory.map(
        (statusEvent: StatusEvent, index: number) => ({
          status: capitalizeStatus(statusEvent?.status || "N/A"),
          description:
            statusEvent?.description?.bn || "No description available",
          date: new Date(statusEvent?.createdAt).toLocaleDateString(),
          time: new Date(statusEvent?.createdAt).toLocaleTimeString(),
          icon: index === 0 ? "box" : "truck",
          isActive: true,
        })
      )
    : [];

  const latestStatus = capitalizeStatus(
    orderData.statusHistory?.[orderData.statusHistory?.length - 1]?.status ||
      "Unknown"
  );

  const parcelTrackingLink = orderData.parcelTrackingLink;

  return (
    <section className="pb-12 pt-6 bg-gray-50/50 min-h-screen">
      <ContainerMax>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>পেছনে ফিরে যান</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Order & Shipping Summary */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Info Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    অর্ডার সামারি
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="pb-3 border-b border-border/40">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      অর্ডার নম্বর
                    </p>
                    <p className="font-mono font-bold text-foreground">
                      #{orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      বর্তমান অবস্থা
                    </p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {latestStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Info Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    শিপিং ইনফরমেশন
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        নাম
                      </p>
                      <p className="text-sm font-medium">
                        {orderData?.shipping?.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        ঠিকানা
                      </p>
                      <p className="text-sm font-medium">
                        {orderData?.shipping?.fullAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        ফোন নম্বর
                      </p>
                      <p className="text-sm font-medium font-mono">
                        {orderData?.shipping?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    অর্ডার ট্র্যাকিং হিস্টোরি
                  </h3>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <Timeline statuses={statuses} latestStatus={latestStatus} />
                </div>

                {/* Parcel Tracking Footer */}
                <div className="mt-10 pt-8 border-t border-border/40">
                  {parcelTrackingLink ? (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        নিচের বাটনে ক্লিক করে কুরিয়ারে লাইভ ট্র্যাকিং করতে
                        পারবেন
                      </p>
                      <a
                        href={parcelTrackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                      >
                        Live Track Parcel
                      </a>
                    </div>
                  ) : (
                    <div className="text-center bg-gray-50/50 p-6 rounded-xl border border-dashed border-border">
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        আপনার পণ্য কুরিয়ারে পাঠানোর পর এখানে{" "}
                        <span className="text-primary font-bold">
                          "Live Track Parcel"
                        </span>{" "}
                        বাটনটি দেখতে পাবেন। অনুগ্রহ করে অপেক্ষা করুন।
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerMax>
    </section>
  );
};

export default TrackOrderDetails;
