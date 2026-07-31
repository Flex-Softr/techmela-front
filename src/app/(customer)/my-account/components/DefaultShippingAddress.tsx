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
import { useEffect, useState } from "react";

const DefaultShippingAddress = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useGetUserDataQuery(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const address = data?.data?.address;

  if (!isMounted) {
    return (
      <Card className="w-full h-full flex flex-col shadow-sm border-border animate-pulse">
        <CardHeader className="py-2.5 px-4 border-b border-border">
          <CardTitle className="text-sm font-semibold text-foreground">
            ডিফল্ট শিপিং এড্রেস
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <div className="h-20 bg-muted rounded-lg"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full flex flex-col shadow-sm border-border">
      <CardHeader className="py-2.5 px-4 border-b border-border">
        <CardTitle className="text-sm font-semibold text-foreground">
          ডিফল্ট শিপিং এড্রেস
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        {address ? (
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-0.5 font-hind-siliguri">
                বিস্তারিত ঠিকানা
              </div>
              <div className="text-sm text-foreground">
                {address.fullAddress}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-muted-foreground font-medium mb-0.5 font-hind-siliguri">
                  শহর
                </div>
                <div className="text-sm text-foreground">{address.city}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium mb-0.5 font-hind-siliguri">
                  দেশ
                </div>
                <div className="text-sm text-foreground">{address.country}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-6">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-hind-siliguri">
              আপনার কোনো ডিফল্ট শিপিং এড্রেস নেই।
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 border-t border-border bg-muted/50 rounded-b-xl">
        <Button
          asChild
          variant="default"
          size="sm"
          className="w-full sm:w-auto text-xs"
        >
          <Link
            href="/edit-account"
            className="flex items-center justify-center gap-1.5 font-hind-siliguri"
          >
            <MapPin className="w-3.5 h-3.5" />
            {address ? "ঠিকানা এডিট করুন" : "ঠিকানা যোগ করুন"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DefaultShippingAddress;
