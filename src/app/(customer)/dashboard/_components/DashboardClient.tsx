"use client";
import { useGetUserDataQuery } from "@/redux/features/user/userApi";
import { useGetOrderedProductsQuery } from "@/redux/features/user/userApi";
import {
  ShoppingBag,
  Package,
  User,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getStatusDisplay } from "@/const/orderStatus";
import Link from "next/link";
import { TOrderInfo } from "@/types/order/orderInfo";
import { useEffect, useState } from "react";

const DashboardClient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: userData } = useGetUserDataQuery(undefined);
  const { data: ordersData, isLoading: isOrdersLoading } =
    useGetOrderedProductsQuery(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { phoneNumber, email, address } = userData?.data || {};
  const fullName =
    userData?.data?.customer?.fullName || userData?.data?.fullName;
  const orders = ordersData?.data || [];

  const successfulOrders = orders.filter(
    (o: TOrderInfo) =>
      o.status?.toLowerCase() === "completed" ||
      o.status?.toLowerCase() === "delivered"
  ).length;

  const stats = [
    {
      label: "মোট অর্ডার",
      value: orders.length,
      icon: <ShoppingBag size={18} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "সফল ডেলিভারি",
      value: successfulOrders,
      icon: <CheckCircle size={18} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "পেন্ডিং অর্ডার",
      value: orders.length - successfulOrders,
      icon: <Clock size={18} />,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  if (!isMounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="h-20 bg-gray-50 rounded-xl"></div>
          <div className="h-20 bg-gray-50 rounded-xl"></div>
          <div className="h-20 bg-gray-50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-hind-siliguri">
      {/* Welcome Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5">
              আসসালামু আলাইকুম,{" "}
              <span className="text-primary">
                {fullName || "সম্মানিত গ্রাহক"}
              </span>
              !
            </h1>
            <p className="text-gray-400 text-sm">
              সিদ্দীকিয়া প্রকাশনীতে আপনাকে স্বাগতম।
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-semibold text-xs">
                অ্যাক্টিভ অ্যাকাউন্ট
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-100 p-3.5 rounded-xl flex items-center gap-3 transition-transform hover:scale-[1.01]"
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <User size={14} className="text-primary" />
              ব্যক্তিগত তথ্য
            </h3>
            <Link
              href="/my-account"
              className="text-sm font-semibold text-primary hover:underline"
            >
              এডিট করুন
            </Link>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                নাম
              </span>
              <span className="text-base font-medium text-gray-800">
                {fullName || "তথ্য নেই"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                ইমেইল
              </span>
              <span className="text-base font-medium text-gray-800">
                {email || "তথ্য নেই"}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                ফোন নম্বর
              </span>
              <span className="text-base font-medium text-gray-800">
                {phoneNumber || "তথ্য নেই"}
              </span>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              শিপিং এড্রেস
            </h3>
            <Link
              href="/my-account"
              className="text-sm font-semibold text-primary hover:underline"
            >
              এডিট করুন
            </Link>
          </div>
          <div className="p-4">
            {address ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  ঠিকানা
                </span>
                <p className="text-base font-medium text-gray-800 leading-relaxed">
                  {address.fullAddress}
                  <br />
                  {address.city}, {address.country}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 opacity-40">
                <MapPin size={28} className="mb-2" />
                <p className="text-sm font-medium">কোন ঠিকানা যুক্ত করা নেই</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <Package size={14} className="text-primary" />
            সাম্প্রতিক অর্ডার
          </h3>
          <Link
            href="/orders"
            className="text-sm font-semibold text-primary hover:underline"
          >
            সবগুলো দেখুন
          </Link>
        </div>
        <div className="overflow-x-auto">
          {isOrdersLoading ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              লোড হচ্ছে...
            </div>
          ) : orders.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 uppercase text-xs font-bold tracking-widest">
                  <th className="px-4 py-3">অর্ডার ID</th>
                  <th className="px-4 py-3">তারিখ</th>
                  <th className="px-4 py-3">অবস্থা</th>
                  <th className="px-4 py-3 text-right">পরিমাণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 3).map((order: TOrderInfo) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900 text-base">
                      #{order.orderId}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-base">
                      {isMounted
                        ? new Date(order.createdAt).toLocaleDateString("bn-BD")
                        : "..."}
                    </td>
                    <td className="px-4 py-3">
                      {(() => {
                        const statusInfo = getStatusDisplay(order.status);
                        return (
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusInfo.className}`}
                          >
                            {statusInfo.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-primary text-base">
                      ৳ {order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-gray-400 text-sm italic">
              এখনও কোনো অর্ডার করা হয়নি।
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardClient;
