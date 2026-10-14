/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getImageSrc } from "@/lib/utils";
import { refetchData } from "@/utilities/actions";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

type TOrderSummaryProps = {
  orderInfo: any;
};

const OrderSummary = ({ orderInfo }: TOrderSummaryProps) => {
  useEffect(() => {
    if (orderInfo?.products) {
      const productTags = orderInfo.products.flatMap((product: any) => [
        `product-${product?.slug}`,
        `relatedProducts-${product?.slug}`,
        `collectionProducts-${product?.slug}`,
      ]);
      refetchData([
        ...productTags,
        "featuredProducts",
        "bestSellingProducts",
        "homepageIndividualSection",
      ]);
    }
  }, [orderInfo]);

  const totalShippingCost = Number(orderInfo.shippingCharge?.amount || 0);

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/50 border-b !pb-0 pt-4 px-5">
        <CardTitle className="flex items-center gap-2 text-lg mb-0">
          <ShoppingBag className="w-5 h-5 text-primary" />
          অর্ডারের বিবরণ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {orderInfo.products?.map((item: any) => (
            <div
              key={item._id}
              className="flex items-start gap-4 p-5 hover:bg-muted/30 transition-colors"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                <Image
                  src={getImageSrc(item?.image?.src || item?.thumbnail?.src)}
                  alt={
                    item?.image?.alt ||
                    item?.thumbnail?.alt ||
                    item?.title ||
                    "Product"
                  }
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                  {item.title}
                </h3>
                {item.variation && (
                  <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-2">
                    {Object.entries(item.variation.attributes || {}).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 font-medium ring-1 ring-inset ring-gray-500/10"
                        >
                          {key}: {value as string}
                        </span>
                      )
                    )}
                  </div>
                )}
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  পরিমাণ: {item.quantity} &times; &#2547;{item.unitPrice}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground text-sm">
                  &#2547;{item.total}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/30 p-5 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>সাবটোটাল</span>
            <span>&#2547;{orderInfo.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>ডেলিভারি চার্জ ({orderInfo.shippingCharge?.name})</span>
            <span>&#2547;{totalShippingCost}</span>
          </div>
          {orderInfo.discount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>ডিসকাউন্ট</span>
              <span>-&#2547;{orderInfo.discount}</span>
            </div>
          )}
          {orderInfo?.couponDiscount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>কুপন ছাড়</span>
              <span>-&#2547;{orderInfo?.couponDiscount}</span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between text-base font-bold text-foreground">
            <span>সর্বমোট</span>
            <span>&#2547;{orderInfo.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
