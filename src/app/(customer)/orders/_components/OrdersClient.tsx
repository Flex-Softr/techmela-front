"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { getStatusDisplay } from "@/const/orderStatus";
import {
  useGetOrderedProductsQuery,
  useLazyGetGuestOrderHistoryQuery,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TOrderInfo } from "@/types/order/orderInfo";
import TGenericResponse from "@/types/response";
import {
  Calendar,
  Eye,
  Phone,
  Search,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const OrdersClient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [guestPhone, setGuestPhone] = useState("");
  const [isSearchingGuest, setIsSearchingGuest] = useState(false);
  const [guestOrders, setGuestOrders] = useState<TOrderInfo[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [phoneError, setPhoneError] = useState("");

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
      const pattern = /^(?:\+88)?01[3-9]\d{8}$/;

      if (!searchPhone) {
        setPhoneError("Please enter a phone number");
        return;
      }

      if (!pattern.test(searchPhone)) {
        setPhoneError("Enter a valid phone number (11 digits)");
        return;
      }

      setPhoneError("");

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
          description: error?.data?.message || "Order not found",
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
    setPhoneError("");
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
        <div className="h-8 bg-muted rounded-lg w-1/3 mb-4"></div>
        <div className="h-64 bg-muted rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-lg font-bold text-foreground mb-0.5">
            Order history
          </h1>
          <p className="text-sm text-muted-foreground">
            All your previous orders will appear here.
          </p>
        </div>
        {isLoggedIn && orders.length > 0 && (
          <div className="bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
            <span className="text-primary font-semibold text-sm">
              Total orders: {orders.length}
            </span>
          </div>
        )}
      </div>

      {!isLoggedIn && (
        <form
          onSubmit={handleGuestSearch}
          className="bg-muted p-4 rounded-xl border border-border space-y-3"
        >
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Search size={14} className="text-primary" />
              Guest order tracking
            </h3>
            <p className="text-[11px] text-muted-foreground">
              View order history with your phone number
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Phone
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={guestPhone}
                onChange={(e) => {
                  setGuestPhone(e.target.value);
                  if (phoneError) setPhoneError("");
                }}
                className="pl-9 pr-9 h-10 text-sm border-border focus:border-primary transition-all"
              />
              {guestPhone && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground transition-colors"
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
              Search
            </Button>
          </div>
          {phoneError && (
            <p className="text-[12px] text-destructive">{phoneError}</p>
          )}
        </form>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-medium text-muted-foreground text-sm">
            Loading orders...
          </p>
        </div>
      ) : sortedOrders.length > 0 ? (
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="py-4 px-4 font-bold text-foreground text-sm">
                    Order ID
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-foreground text-sm">
                    Date
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-foreground text-sm">
                    Status
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-foreground text-sm">
                    Total amount
                  </TableHead>
                  <TableHead className="py-4 px-4 font-bold text-foreground text-sm text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order: TOrderInfo) => {
                  const statusInfo = getStatusDisplay(order.status);
                  return (
                    <TableRow
                      key={order._id}
                      className="border-border transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Tag size={12} className="text-primary/60" />
                          <span className="font-bold text-foreground text-base">
                            #{order.orderId}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar
                            size={12}
                            className="text-muted-foreground"
                          />
                          <span className="text-base">
                            {isMounted
                              ? new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
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
                          &#2547; {order.total}
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
                          Details
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
        <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/50 rounded-xl border border-dashed border-border">
          <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingBag size={28} className="text-muted-foreground" />
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1">
            No orders found
          </h3>
          <p className="text-xs text-muted-foreground max-w-xs mb-6">
            We could not find any orders. Browse the shop and order your
            favorite products.
          </p>
          <Button
            size="sm"
            className="rounded-lg px-8 font-semibold"
            onClick={() => router.push("/shop")}
          >
            Start shopping
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersClient;
