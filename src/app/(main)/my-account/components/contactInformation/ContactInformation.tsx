"use client";
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
  const { data } = useGetUserDataQuery(undefined);

  const { email, fullName, phoneNumber } = data?.data || {};
  return (
    <Card className="w-full h-full flex flex-col shadow-sm border-gray-200/60">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
          Contact Information
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm md:text-base">
          <div className="text-gray-500 font-medium">Name</div>
          <div className="sm:col-span-2 text-gray-900 font-medium">
            {fullName || "Not provided"}
          </div>

          <div className="text-gray-500 font-medium">E-mail</div>
          <div className="sm:col-span-2 text-gray-900 font-medium">
            {email || "Not provided"}
          </div>

          <div className="text-gray-500 font-medium">Phone number</div>
          <div className="sm:col-span-2 text-gray-900 font-medium">
            {phoneNumber || "Not provided"}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <Button asChild variant="default" className="w-full sm:w-auto">
          <Link
            href="/my-account/edit-account"
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link
            href="/auth/change-password"
            className="flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            Change Password
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactInformation;
