import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ArrowRight, Calendar, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";

type TCustomerDetailsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderInfo: any;
};

const CustomerDetails = ({ orderInfo }: TCustomerDetailsProps) => {
  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm h-fit">
        <CardHeader className="bg-gray-50/50 border-b pb-3 pt-4 px-5">
          <CardTitle className="text-lg font-semibold">
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-5 text-sm">
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                <span className="font-bold text-sm">
                  {orderInfo.shipping?.fullName?.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {orderInfo.shipping?.fullName}
              </p>
              <p className="text-gray-500 text-xs">
                {orderInfo.shipping?.phoneNumber}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Shipping Address</p>
              <p className="text-gray-500 mt-0.5 text-xs leading-relaxed">
                {orderInfo.shipping?.fullAddress}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CreditCard className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Payment Method</p>
              <p className="text-gray-500 mt-0.5 text-xs">
                {orderInfo.payment?.paymentMethod?.name || "Cash On Delivery"}
                {orderInfo.payment?.transactionId &&
                  ` (TrxID: ${orderInfo.payment.transactionId})`}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Order Date</p>
              <p className="text-gray-500 mt-0.5 text-xs">
                {orderInfo.createdAt
                  ? format(
                      new Date(orderInfo.createdAt),
                      "MMM dd, yyyy, h:mm a"
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        asChild
        className="w-full h-11 text-base font-medium shadow hover:shadow-lg transition-all"
        size="lg"
      >
        <Link href="/shop">
          Continue Shopping <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default CustomerDetails;
