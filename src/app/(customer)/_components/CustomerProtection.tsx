"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const CustomerProtection = ({ children }: Props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // List of routes that don't require login within the (customer) group
    const publicRoutes = [
      "/auth/login",
      "/auth/registration",
      "/auth/forget-password",
      "/auth/reset-password",
      "/orders",
    ];
    const isPublicRoute = publicRoutes.some((route) =>
      pathname.includes(route)
    );

    if (!isLoggedIn && !isPublicRoute) {
      router.push(`/auth/login?redirect_url=${pathname}`);
    }
  }, [isLoggedIn, router, pathname]);

  // If it's a public route or the user is logged in, show the content
  // Otherwise, we return null to avoid flashing content before redirect
  const publicRoutes = [
    "/auth/login",
    "/auth/registration",
    "/auth/forget-password",
    "/auth/reset-password",
    "/orders",
  ];
  const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

  if (!isLoggedIn && !isPublicRoute) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground ">Verifying...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CustomerProtection;
