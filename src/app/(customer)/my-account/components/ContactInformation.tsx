"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useGetUserDataQuery } from "@/redux/features/user/userApi";
import { Edit, KeyRound } from "lucide-react";
import Link from "next/link";

const ContactInformation = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useGetUserDataQuery(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { email, fullName, phoneNumber } = data?.data || {};

  if (!isMounted) {
    return (
      <Card className="w-full h-full flex flex-col shadow-sm border-border animate-pulse">
        <CardHeader className="py-2.5 px-4 border-b border-border">
          <CardTitle className="text-sm font-semibold text-foreground">
            Personal information
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
          Personal information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2">
          <div className="text-xs text-muted-foreground font-medium ">Name</div>
          <div className="sm:col-span-2 text-sm text-foreground font-medium">
            {fullName || "Not available"}
          </div>

          <div className="text-xs text-muted-foreground font-medium ">
            Email
          </div>
          <div className="sm:col-span-2 text-sm text-foreground font-medium">
            {email || "Not available"}
          </div>

          <div className="text-xs text-muted-foreground font-medium ">
            Phone number
          </div>
          <div className="sm:col-span-2 text-sm text-foreground font-medium">
            {phoneNumber || "Not available"}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 p-4 border-t border-border bg-muted/50 rounded-b-xl">
        <Button
          asChild
          variant="default"
          size="sm"
          className="w-full sm:w-auto text-xs"
        >
          <Link href="/edit-account" className="flex items-center gap-1.5 ">
            <Edit className="w-3.5 h-3.5" />
            Edit profile
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs"
        >
          <Link
            href="/auth/change-password"
            className="flex items-center gap-1.5 "
          >
            <KeyRound className="w-3.5 h-3.5" />
            Change password
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactInformation;
