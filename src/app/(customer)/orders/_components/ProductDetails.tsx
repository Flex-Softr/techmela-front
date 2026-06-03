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
      <div className="flex items-center justify-center py-20 text-gray-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">
            অর্ডারের তথ্য লোড হচ্ছে...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">Error fetching data</h2>
        <p className="text-gray-500 mt-2">
          We couldn&apos;t load the order details. Please try again later.
        </p>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mt-6"
        >
          Go Back
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
          className="group flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors text-sm h-9"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          অর্ডারে ফিরুন
        </Button>
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          অর্ডার ID: #{orderId}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Order Summary */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="py-3 px-4 border-b border-gray-100">
            <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              অর্ডার সারসংক্ষেপ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">পেমেন্ট পদ্ধতি</span>
              <span className="text-sm font-semibold text-gray-800">
                {payment?.paymentMethod?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-50 pt-2.5">
              <span className="text-sm text-gray-500">সাবটোটাল</span>
              <span className="text-sm font-semibold text-gray-800">
                &#2547;{subtotal}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-50 pt-2.5">
              <span className="text-sm text-gray-500">
                শিপিং চার্জ ({shippingCharge?.name})
              </span>
              <span className="text-sm font-semibold text-gray-800">
                &#2547;{shippingCharge?.amount}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2.5">
              <span className="text-gray-700 font-bold text-base">
                মোট পরিমাণ
              </span>
              <span className="text-primary font-bold text-base">
                &#2547;{total}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="py-3 px-4 border-b border-gray-100">
            <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              শিপিং এড্রেস
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold text-base text-gray-900">
              {shipping?.fullName}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {shipping?.fullAddress}
            </p>
            <p className="text-sm text-gray-500">
              ফোন: {shipping?.phoneNumber}
            </p>
            {shipping?.email && (
              <p className="text-sm text-gray-500">ইমেইল: {shipping?.email}</p>
            )}
            <div className="pt-3 border-t border-gray-50 mt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  অর্ডার অবস্থা
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
      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-gray-100 bg-gray-50/30">
          <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            এই অর্ডারের পণ্যসমূহ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="font-bold text-gray-700 py-3 px-4 text-sm">
                    পণ্য
                  </TableHead>
                  <TableHead className="font-bold text-gray-700 py-3 px-4 text-sm">
                    পরিমাণ
                  </TableHead>
                  <TableHead className="font-bold text-gray-700 py-3 px-4 text-sm text-right">
                    একক মূল্য
                  </TableHead>
                  <TableHead className="font-bold text-gray-700 py-3 px-4 text-sm text-right">
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
                      className="border-gray-100 transition-colors"
                    >
                      <TableCell className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                            <Image
                              fill
                              src={getImageSrc(item?.image?.src)}
                              alt={item?.image?.alt || item?.title || "Product"}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item?.title || "Unknown Product"}
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
                                    className="inline-flex items-center rounded bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-inset ring-gray-500/10 capitalize"
                                  >
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-600 font-medium text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-right text-gray-600">
                        &#2547;{item.unitPrice}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-right font-bold text-gray-900">
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
