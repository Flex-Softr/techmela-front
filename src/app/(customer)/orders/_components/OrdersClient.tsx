"use client";
import {
  useGetOrderedProductsQuery,
  useLazyGetGuestOrderHistoryQuery,
} from "@/redux/features/user/userApi";
import {
  ShoppingBag,
  Eye,
  Calendar,
  Tag,
  Search,
  Phone,
  X,
} from "lucide-react";
import { getStatusDisplay } from "@/const/orderStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { TOrderInfo } from "@/types/order/orderInfo";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TGenericResponse from "@/types/response";

const OrdersClient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [guestPhone, setGuestPhone] = useState("");
  const [isSearchingGuest, setIsSearchingGuest] = useState(false);
  const [guestOrders, setGuestOrders] = useState<TOrderInfo[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: authOrdersData, isLoading: isAuthLoading } =
    useGetOrderedProductsQuery(undefined, {
      skip: !isLoggedIn,
    });

  const [triggerGuestSearch, { isLoading: isGuestLoading }] =
    useLazyGetGuestOrderHistoryQuery();

  const router = useRouter();

  const handleGuestSearch = useCallback(
    async (e?: React.FormEvent, phone?: string) => {
      if (e) e.preventDefault();
      const searchPhone = phone || guestPhone;

      if (!searchPhone) {
        toast({
          title: "Error",
          description: "দয়া করে ফোন নম্বর দিন",
          variant: "destructive",
        });
        return;
      }

      try {
        setIsSearchingGuest(true);
        const res = (await triggerGuestSearch(
          searchPhone
        ).unwrap()) as TGenericResponse<TOrderInfo[]>;
        if (res.success) {
          setGuestOrders(res.data || []);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("lastGuestPhone", searchPhone);
          }
        }
      } catch (err: unknown) {
        const error = err as { data?: { message?: string } };
        toast({
          title: "Error",
          description: error?.data?.message || "অর্ডার খুঁজে পাওয়া যায়নি",
          variant: "destructive",
        });
        setGuestOrders([]);
      } finally {
        setIsSearchingGuest(false);
        setHasSearched(true);
      }
    },
    [guestPhone, triggerGuestSearch]
  );

  const handleClear = useCallback(() => {
    setGuestPhone("");
    setGuestOrders([]);
    setHasSearched(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("lastGuestPhone");
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn && typeof window !== "undefined") {
      const storedPhone = sessionStorage.getItem("lastGuestPhone");
      if (storedPhone) {
        setGuestPhone(storedPhone);
        const fetchGuestOrders = async () => {
          try {
            setIsSearchingGuest(true);
            const res = (await triggerGuestSearch(
              storedPhone
            ).unwrap()) as TGenericResponse<TOrderInfo[]>;
            if (res.success) {
              setGuestOrders(res.data || []);
            }
          } catch (err: unknown) {
            // Silently fail on mount restore
          } finally {
            setIsSearchingGuest(false);
            setHasSearched(true);
          }
        };
        fetchGuestOrders();
      }
    }
  }, [isLoggedIn, triggerGuestSearch]);

  const orders = isLoggedIn ? authOrdersData?.data || [] : guestOrders;
  const isLoading = isLoggedIn ? isAuthLoading : isGuestLoading;

  const sortedOrders = [...orders].sort(
    (a: TOrderInfo, b: TOrderInfo) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!isMounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-50 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-hind-siliguri">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-lg font-bold text-gray-900 mb-0.5">
            অর্ডার হিস্টোরি
          </h1>
          <p className="text-sm text-gray-400">
            আপনার পূর্বের সকল অর্ডার এখানে দেখা যাবে।
          </p>
        </div>
        {isLoggedIn && orders.length > 0 && (
          <div className="bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
            <span className="text-primary font-semibold text-sm">
              মোট অর্ডার: {orders.length}
            </span>
          </div>
        )}
      </div>

      {!isLoggedIn && (
        <form
          onSubmit={handleGuestSearch}
          className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3"
        >
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Search size={14} className="text-primary" />
              গেস্ট অর্ডার ট্র্যাক
            </h3>
            <p className="text-[11px] text-gray-500">
              আপনার ফোন নম্বর দিয়ে অর্ডার হিস্টোরি দেখুন
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Phone
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                type="tel"
                placeholder="০১XXXXXXXXX"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="pl-9 pr-9 h-10 text-sm border-gray-200 focus:border-primary transition-all"
              />
              {guestPhone && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <Button
              type="submit"
              size="sm"
              className="h-10 px-6 font-bold"
              disabled={isSearchingGuest}
            >
              খুঁজুন
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-300 gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-medium text-gray-400 text-sm">
            অর্ডার লোড হচ্ছে...
          </p>
        </div>
      ) : sortedOrders.length > 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="py-4 px-4 font-bold text-gray-700 text-sm">
                    অর্ডার ID
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-gray-700 text-sm">
                    তারিখ
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-gray-700 text-sm">
                    অবস্থা
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-gray-700 text-sm">
                    মোট পরিমাণ
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-gray-700 text-sm text-right">
                    অ্যাকশন
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order: TOrderInfo) => {
                  const statusInfo = getStatusDisplay(order.status);
                  return (
                    <TableRow
                      key={order._id}
                      className="border-gray-50 transition-colors hover:bg-gray-50/30"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Tag size={12} className="text-primary/60" />
                          <span className="font-bold text-gray-900 text-base">
                            #{order.orderId}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-base">
                            {isMounted
                              ? new Date(order.createdAt).toLocaleDateString(
                                  "bn-BD",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "..."}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <Badge
                          variant="outline"
                          className={`font-bold px-3 py-1 text-xs rounded-full border ${statusInfo.className}`}
                        >
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <span className="font-bold text-primary text-base">
                          ৳ {order.total}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-9 px-4 font-semibold gap-2 text-primary hover:bg-primary/5 hover:text-primary transition-all rounded-lg"
                          onClick={() => router.push(`/orders/${order._id}`)}
                        >
                          <Eye size={16} />
                          বিস্তারিত
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : isLoggedIn || hasSearched ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag size={28} className="text-gray-300" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">
            কোনো অর্ডার পাওয়া যায়নি
          </h3>
          <p className="text-xs text-gray-400 max-w-xs mb-6">
            আপনার কোনো অর্ডার খুঁজে পাওয়া যায়নি। শপ থেকে আপনার পছন্দের বই অর্ডার
            করুন।
          </p>
          <Button
            size="sm"
            className="rounded-lg px-8 font-semibold"
            onClick={() => router.push("/shop")}
          >
            কেনাকাটা শুরু করুন
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersClient;
