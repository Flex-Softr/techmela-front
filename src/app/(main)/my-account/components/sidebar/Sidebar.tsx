"use client";
import NavLink from "@/components/navLink/NavLink";
import { toast } from "@/components/ui/use-toast";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TGenericResponse, { TGenericErrorResponse } from "@/types/response";
import { LogIn, LogOut, ShoppingBag, User } from "lucide-react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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

  const navItemClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-primary/5 hover:text-primary";
  const activeClass =
    "bg-primary/5 text-primary font-bold border border-primary/20";

  return (
    <div className="md:col-span-4 lg:col-span-3">
      <div className="py-2 md:py-6 sticky top-24">
        <div className="mb-4 hidden md:block">
          <h2 className="text-xl font-bold text-gray-800 px-2">Account</h2>
        </div>
        <ul className="select-none flex flex-col gap-2">
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  href="/my-account"
                  className={navItemClass}
                  activeClassName={activeClass}
                >
                  <User size={20} className="shrink-0" />
                  <span>My account</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/my-account/my-orders"
                  className={navItemClass}
                  activeClassName={activeClass}
                >
                  <ShoppingBag size={20} className="shrink-0" />
                  <span>My orders</span>
                </NavLink>
              </li>
              <li className="pt-2 mt-2 border-t border-gray-100">
                <button
                  className={`w-full text-left ${navItemClass} text-red-600 hover:bg-red-50 hover:text-red-700`}
                  onClick={handleLogOut}
                >
                  <LogOut size={20} className="shrink-0" />
                  <span>Log out</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  href="/auth/login?redirect_url=/my-account"
                  className={navItemClass}
                  activeClassName={activeClass}
                >
                  <LogIn size={20} className="shrink-0" />
                  <span>Login</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/my-account/my-orders"
                  className={navItemClass}
                  activeClassName={activeClass}
                >
                  <ShoppingBag size={20} className="shrink-0" />
                  <span>My orders</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
