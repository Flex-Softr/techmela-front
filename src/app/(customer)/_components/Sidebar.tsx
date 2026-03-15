"use client";
import NavLink from "@/components/shared/navLink/NavLink";
import { toast } from "@/components/ui/use-toast";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TGenericResponse, { TGenericErrorResponse } from "@/types/response";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [isMounted, setIsMounted] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogOut = async () => {
    try {
      const result = (await logout({}).unwrap()) as TGenericResponse;
      if (result?.success) {
        dispatch(logOut());
        window?.localStorage?.removeItem("persist:auth");
        window?.location?.assign("/");
      }
    } catch (error) {
      const err = error as TGenericErrorResponse;
      toast({
        title: "Error",
        description: err.message,
      });
    }
  };

  if (!isMounted) {
    return (
      <div className="space-y-5 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm h-full">
        <div className="px-1 border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900 mb-0.5">
            আমার অ্যাকাউন্ট
          </h2>
          <p className="text-sm text-gray-400">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const navItemClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-gray-200 group text-base font-medium";
  const activeClass =
    "bg-primary/5 text-primary border-primary font-semibold shadow-sm shadow-primary/5";

  return (
    <div className="space-y-5 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm h-full">
      <div className="px-1 border-b border-gray-100 pb-3">
        <h2 className="text-base font-bold text-gray-900 mb-0.5">
          আমার অ্যাকাউন্ট
        </h2>
        <p className="text-sm text-gray-400">তথ্য ও অর্ডার ম্যানেজ করুন</p>
      </div>

      <nav className="flex flex-col gap-3 select-none">
        {isLoggedIn ? (
          <>
            <NavLink
              href="/dashboard"
              className={navItemClass}
              activeClassName={activeClass}
            >
              <LayoutDashboard size={16} className="shrink-0" />
              <span>ড্যাশবোর্ড</span>
            </NavLink>

            <NavLink
              href="/orders"
              className={navItemClass}
              activeClassName={activeClass}
            >
              <ShoppingBag size={16} className="shrink-0" />
              <span>আমার অর্ডার</span>
            </NavLink>

            <NavLink
              href="/my-account"
              className={navItemClass}
              activeClassName={activeClass}
            >
              <User size={16} className="shrink-0" />
              <span>ব্যক্তিগত তথ্য</span>
            </NavLink>

            <div className="pt-2 mt-1 border-t border-gray-100">
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent transition-all duration-200 text-red-500 hover:bg-red-50 hover:border-red-100 text-base font-medium"
              >
                <LogOut size={16} className="shrink-0" />
                <span className="font-semibold">লগ আউট</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              href="/auth/login?redirect_url=/dashboard"
              className={navItemClass}
              activeClassName={activeClass}
            >
              <LogIn size={16} className="shrink-0" />
              <span>লগইন করুন</span>
            </NavLink>
            <NavLink
              href="/orders"
              className={navItemClass}
              activeClassName={activeClass}
            >
              <ShoppingBag size={16} className="shrink-0" />
              <span>গেস্ট অর্ডার চেক</span>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
