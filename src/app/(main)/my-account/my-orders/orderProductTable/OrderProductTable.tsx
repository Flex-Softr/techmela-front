"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrderedProductsQuery } from "@/redux/features/user/userApi";
import { Eye, Package, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../components/productType/ProductType";

const OrderProductTable = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { data, isLoading } = useGetOrderedProductsQuery(undefined);
  const router = useRouter();

  useEffect(() => {
    if (data?.data) {
      const total = data.data.reduce(
        (sum: number, product: Product) =>
          sum + (isNaN(product.total) ? 0 : product.total),
        0
      );
      setTotalAmount(total);
    }
  }, [data]);

  const sortedData = data?.data
    ?.slice()
    .sort(
      (a: Product, b: Product) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleViewOrder = (_id: string) => {
    router.push(`/my-account/my-orders/${_id}`);
  };

  return (
    <Card className="w-full shadow-sm border-gray-200/60 overflow-hidden">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          Order History
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Loading orders...</span>
            </div>
          </div>
        ) : !sortedData || sortedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              No orders found
            </h3>
            <p className="text-gray-500 max-w-xs">
              You haven&apos;t placed any orders yet. Start shopping to see your
              history here.
            </p>
            <Button className="mt-6" onClick={() => router.push("/shop")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead className="font-bold text-gray-900 py-4 px-6 min-w-[120px]">
                    Order ID
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 py-4 px-6 min-w-[120px]">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 py-4 px-6 min-w-[120px]">
                    Total Amount
                  </TableHead>
                  <TableHead className="text-right font-bold text-gray-900 py-4 px-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((order: Product) => (
                  <TableRow
                    key={order._id}
                    className="group border-gray-100 transition-colors"
                  >
                    <TableCell className="py-4 px-6 font-medium text-gray-900">
                      #{order.orderId}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-600">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4 px-6 font-bold text-gray-900">
                      &#2547; {order.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary hover:bg-primary/10 gap-2 font-semibold"
                        onClick={() => handleViewOrder(order._id)}
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-gray-50/80 border-t border-gray-100">
                <TableRow>
                  <TableCell
                    className="py-4 px-6 font-bold text-gray-900"
                    colSpan={2}
                  >
                    Total ({sortedData.length} items)
                  </TableCell>
                  <TableCell
                    className="py-4 px-6 text-right font-extrabold text-lg text-primary"
                    colSpan={2}
                  >
                    &#2547; {totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderProductTable;
