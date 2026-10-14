"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrderProductByIdQuery } from "@/redux/features/user/userApi";
import { getStatusDisplay } from "@/const/orderStatus";
import { TOrderedProducts } from "@/types/order/orderInfo";
import { TVariation } from "@/types/products/variableProduct";
import {
  ArrowLeft,
  MapPin,
  Package,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getImageSrc } from "@/lib/utils";

const OrderDetails = () => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const { data, isLoading, isError } = useGetOrderProductByIdQuery(id);

  useEffect(() => {
    setIsMounted(true);
    if (!id) {
      router.push("/orders");
    }
  }, [id, router]);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">
            অর্ডারের বিবরণ লোড হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-foreground">
          তথ্য লোড করতে সমস্যা হয়েছে
        </h2>
        <p className="text-muted-foreground mt-2">
          অর্ডারের বিবরণ প্রদর্শন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার
          চেষ্টা করুন।
        </p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mt-6"
        >
          ফিরে যান
        </Button>
      </div>
    );
  }

  const {
    orderId,
    total,
    subtotal,
    shippingCharge,
    payment,
    shipping,
    products,
    orderedProducts,
  } = data.data || {};
  const allProducts = products || orderedProducts || [];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm h-9"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          সকল অর্ডারে ফিরে যান
        </Button>
        <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          অর্ডার নম্বর: #{orderId}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Order Summary */}
        <Card className="shadow-sm border-border">
          <CardHeader className="py-3 px-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              অর্ডারের বিবরণ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                পেমেন্ট পদ্ধতি
              </span>
              <span className="text-sm font-semibold text-foreground">
                {payment?.paymentMethod?.name?.toLowerCase().includes("cash")
                  ? "ক্যাশ অন ডেলিভারি"
                  : payment?.paymentMethod?.name || "ক্যাশ অন ডেলিভারি"}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2.5">
              <span className="text-sm text-muted-foreground">সাবটোটাল</span>
              <span className="text-sm font-semibold text-foreground">
                &#2547;{subtotal}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2.5">
              <span className="text-sm text-muted-foreground">
                ডেলিভারি চার্জ ({shippingCharge?.name})
              </span>
              <span className="text-sm font-semibold text-foreground">
                &#2547;{shippingCharge?.amount}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2.5">
              <span className="text-foreground font-bold text-base">
                সর্বমোট
              </span>
              <span className="text-primary font-bold text-base">
                &#2547;{total}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="shadow-sm border-border">
          <CardHeader className="py-3 px-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              ডেলিভারির ঠিকানা
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold text-base text-foreground">
              {shipping?.fullName}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {shipping?.fullAddress}
            </p>
            <p className="text-sm text-muted-foreground">
              ফোন: {shipping?.phoneNumber}
            </p>
            {shipping?.email && (
              <p className="text-sm text-muted-foreground">
                ইমেইল: {shipping?.email}
              </p>
            )}
            <div className="pt-3 border-t border-border mt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  অর্ডারের অবস্থা
                </span>
                {(() => {
                  const statusInfo = getStatusDisplay(data?.data?.status || "");
                  return (
                    <span
                      className={`px-2.5 py-1 rounded-full text-sm font-bold border ${statusInfo.className}`}
                    >
                      {statusInfo.label}
                    </span>
                  );
                })()}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs h-8 gap-2 font-bold border-primary/20 text-primary hover:bg-primary/5"
                onClick={() => router.push(`/track-your-order/${orderId}`)}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                অর্ডার ট্র্যাক করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Information */}
      <Card className="shadow-sm border-border overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-border bg-muted/30">
          <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            অর্ডারের পণ্যসমূহ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold text-foreground py-3 px-4 text-sm">
                    পণ্য
                  </TableHead>
                  <TableHead className="font-bold text-foreground py-3 px-4 text-sm">
                    পরিমাণ
                  </TableHead>
                  <TableHead className="font-bold text-foreground py-3 px-4 text-sm text-right">
                    মূল্য
                  </TableHead>
                  <TableHead className="font-bold text-foreground py-3 px-4 text-sm text-right">
                    মোট
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts?.map((item: TOrderedProducts, index: number) => {
                  const variation =
                    typeof item.variation === "object"
                      ? (item.variation as TVariation)
                      : null;
                  return (
                    <TableRow
                      key={item.productId || index}
                      className="border-border transition-colors"
                    >
                      <TableCell className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                            <Image
                              fill
                              src={getImageSrc(
                                item?.image?.src || item?.thumbnail?.src
                              )}
                              alt={
                                item?.image?.alt ||
                                item?.thumbnail?.alt ||
                                item?.title ||
                                "Product"
                              }
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-foreground line-clamp-2">
                              {item?.title || "পণ্য"}
                            </span>
                            {variation && (
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {Object.entries(
                                  (variation.attributes as Record<
                                    string,
                                    string
                                  >) || {}
                                ).map(([key, value]) => (
                                  <span
                                    key={key}
                                    className="inline-flex items-center rounded bg-muted px-2 py-1 text-xs text-muted-foreground ring-1 ring-inset ring-gray-500/10 capitalize"
                                  >
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-muted-foreground font-medium text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-right text-muted-foreground">
                        &#2547;{item.unitPrice}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-right font-bold text-foreground">
                        &#2547;{item.total}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          size="sm"
          className="px-8 h-9 border-primary/30 text-sm font-medium"
        >
          ফিরে যান
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
