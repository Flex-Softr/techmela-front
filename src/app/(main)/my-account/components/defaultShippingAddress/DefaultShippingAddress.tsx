"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserDataQuery } from "@/redux/features/user/userApi";
import { MapPin } from "lucide-react";
import Link from "next/link";

const DefaultShippingAddress = () => {
  const { data } = useGetUserDataQuery(undefined);

  const address = data?.data?.address;

  return (
    <Card className="w-full h-full flex flex-col shadow-sm border-gray-200/60">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
          Default Shipping Address
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 flex-1">
        {address ? (
          <div className="space-y-4 text-sm md:text-base">
            <div>
              <div className="text-gray-500 font-medium mb-1">Full Address</div>
              <div className="text-gray-900">{address.fullAddress}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 font-medium mb-1">City</div>
                <div className="text-gray-900">{address.city}</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium mb-1">Country</div>
                <div className="text-gray-900">{address.country}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">
              You have no default shipping address set.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex pt-6 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <Button asChild variant="default" className="w-full sm:w-auto">
          <Link
            href="/my-account/edit-account"
            className="flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            {address ? "Edit Address" : "Add Address"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DefaultShippingAddress;
