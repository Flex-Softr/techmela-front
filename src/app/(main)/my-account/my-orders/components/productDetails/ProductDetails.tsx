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
import { ArrowLeft, MapPin, Package, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Product } from "../productType/ProductType";

const OrderDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { _id } = params;
  const { data, isLoading, isError } = useGetOrderProductByIdQuery(_id);

  useEffect(() => {
    if (!_id) {
      router.push("/my-account/my-orders");
    }
  }, [_id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">Loading order details...</span>
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

  const { orderId, total, payment, shipping, products } = data.data || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </Button>
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Order ID: #{orderId}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <Card className="shadow-sm border-gray-200/60">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-3">
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-800">
                {payment?.paymentMethod?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-t border-gray-50 pt-3">
              <span className="text-gray-700 font-bold text-lg">
                Total Amount
              </span>
              <span className="text-primary font-bold text-xl">
                &#2547;{total?.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="shadow-sm border-gray-200/60">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 space-y-2">
            <p className="font-bold text-gray-900">{shipping?.fullName}</p>
            <p className="text-gray-600 leading-relaxed">
              {shipping?.fullAddress}
            </p>
            <p className="text-gray-600 font-medium">
              Phone: {shipping?.phoneNumber}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Product Information */}
      <Card className="shadow-sm border-gray-200/60 overflow-hidden">
        <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/30">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Products in this Order
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="font-bold text-gray-900 py-4 px-6">
                    Product
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 py-4 px-6">
                    Quantity
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 py-4 px-6 text-right">
                    Unit Price
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 py-4 px-6 text-right">
                    Subtotal
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 py-4 px-6 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product: Product) => (
                  <TableRow
                    key={product._id}
                    className="border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shrink-0">
                          <Image
                            fill
                            src={product?.image?.src || ""}
                            alt={product?.image?.alt || product.title}
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600 font-medium text-center">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right text-gray-600">
                      &#2547;{product.unitPrice}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right font-bold text-gray-900">
                      &#2547;{product.total}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10 gap-2"
                      >
                        <Link href={`/track-your-order/${orderId}`}>
                          <Truck className="w-4 h-4" />
                          Track
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="px-8 border-gray-300"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
