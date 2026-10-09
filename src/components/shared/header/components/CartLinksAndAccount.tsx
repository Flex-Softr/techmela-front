"use client";
import Image from "next/image";
import Link from "next/link";
import CartSidebar from "@/components/cart/CartSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { useDebounce } from "@/hooks/useDebounce";
import { getImageSrc } from "@/lib/utils";
import { ApiResponse } from "@/redux/features/searchProduct/interface";
import { useFindSearchProductQuery } from "@/redux/features/searchProduct/searchProuctApi";
import { useGetUserDataQuery } from "@/redux/features/user/userApi";
import { TProduct } from "@/types/products/product";
import { TVariableProduct } from "@/types/products/variableProduct";
import { ShoppingCart, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/redux/hooks";

/* -------------------- type guards -------------------- */
const isVariableProduct = (
  product: TProduct | TVariableProduct
): product is TVariableProduct => product.type === "variable";

const isApiResponse = (response: unknown): response is ApiResponse => {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    "data" in response
  );
};

const CartLinksAndAccount = () => {
  const router = useRouter();
  const { totalCartItem } = useCart();

  const token = useAppSelector((state) => state.auth.token);

  const { data: user } = useGetUserDataQuery(undefined, { skip: !token });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMounted, setIsMounted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 400);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
    setShowSuggestions(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, isLoading, isError } = useFindSearchProductQuery<ApiResponse>(
    debouncedSearchValue.trim(),
    {
      skip: !debouncedSearchValue.trim(),
    }
  );

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      `/shop?search=${encodeURIComponent(debouncedSearchValue.trim())}`
    );
    setIsSearchVisible(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setShowSuggestions(true);
  };

  const handleProductClick = (productId: string): void => {
    router.push(`/product/${productId}`);
    setShowSuggestions(false);
    setIsSearchVisible(false);
  };

  const products: (TProduct | TVariableProduct)[] = isApiResponse(data)
    ? data.data
    : [];

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {isSmallScreen ? (
        <>
          <Button
            variant={"ghost"}
            onClick={toggleSearchBar}
            className="size-9 rounded-full text-white hover:text-white hover:bg-white/15 transition-all duration-300"
            aria-label="Open search"
          >
            <FaSearch className="size-4" />
          </Button>
          <form
            onSubmit={handleSearchSubmit}
            className={`fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 flex items-start justify-center pt-1 px-2 transition-all duration-300 ${
              isSearchVisible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`bg-background shadow-2xl p-3.5 rounded-xl flex items-center w-full max-w-md mx-auto transition-transform duration-300 transform ${
                isSearchVisible
                  ? "translate-y-2 scale-100"
                  : "-translate-y-full scale-95"
              }`}
            >
              <div className="relative flex-1 h-11">
                <input
                  type="text"
                  placeholder="Search your favorite products..."
                  className="w-full h-full rounded-full border border-border bg-muted pr-12 outline-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pl-5 placeholder:text-sm transition-all"
                  name="searchValue"
                  value={searchValue}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(true)}
                  aria-label="Search products"
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  type="submit"
                  aria-label="Submit search"
                >
                  <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                    <FaSearch className="text-sm" />
                  </div>
                </button>
              </div>
              {showSuggestions && debouncedSearchValue.trim() !== "" && (
                <div className="absolute mt-2 top-full left-1/2 transform -translate-x-1/2 w-[95%] max-w-md bg-background border border-border rounded-xl shadow-xl z-50 overflow-y-auto max-h-80">
                  {isLoading && (
                    <p className="p-4 text-sm text-center text-primary/70 animate-pulse">
                      Searching...
                    </p>
                  )}

                  {!isLoading && !isError && products.length > 0
                    ? products.map((product) => {
                        const isVariable = isVariableProduct(product);

                        const regularPrice = isVariable
                          ? product.minRegularPrice
                          : product.regularPrice;

                        const salePrice = isVariable
                          ? product.minSalePrice || null
                          : product.salePrice || null;

                        return (
                          <div
                            key={product._id}
                            className="flex items-center gap-3 p-3 border-b border-border last:border-0 cursor-pointer hover:bg-muted/80 transition-colors"
                            onClick={() => handleProductClick(product.slug)}
                          >
                            <Image
                              width={48}
                              height={48}
                              src={getImageSrc(product.thumbnail.src)}
                              alt={product.thumbnail.alt || ""}
                              className="rounded-md object-cover shadow-sm border border-border"
                            />

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-primary line-clamp-1">
                                {product.title}
                              </p>

                              <div className="text-sm mt-0.5">
                                {salePrice ? (
                                  <>
                                    {!isVariable && (
                                      <span className="text-[11px] text-primary/60 line-through mr-1.5">
                                        &#2547;{regularPrice}
                                      </span>
                                    )}
                                    <span className="font-bold text-primary">
                                      &#2547;{salePrice}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-bold text-primary">
                                    &#2547;{regularPrice}
                                  </span>
                                )}

                                {isVariable && (
                                  <span className="ml-1 font-bold text-primary/80">
                                    – &#2547;{product.maxRegularPrice}
                                  </span>
                                )}
                              </div>

                              {isVariable && (
                                <p className="text-[10px] text-primary/80 font-medium uppercase tracking-wider mt-0.5">
                                  Multiple options
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    : !isLoading && (
                        <p className="p-4 text-sm text-center text-primary/70">
                          No products found.
                        </p>
                      )}
                </div>
              )}
              <div className="pl-3">
                <Button
                  type="button"
                  variant={"ghost"}
                  className="h-9 w-9 aspect-square rounded-full hover:bg-muted text-primary/80 hover:text-primary transition-colors"
                  onClick={toggleSearchBar}
                  aria-label="Close search"
                >
                  <FaTimes />
                </Button>
              </div>
            </div>
          </form>
        </>
      ) : null}

      <Button
        asChild
        variant={"ghost"}
        className="rounded-full size-9 p-0 border border-white/25 bg-white/10 text-white hover:text-white hover:bg-white/20 transition-all duration-300 hidden sm:flex items-center justify-center shadow-xs overflow-hidden"
      >
        <Link href="/my-account" aria-label="My Account">
          {user?.data?._id ? (
            <div className="w-full h-full flex items-center justify-center bg-white/20 text-white">
              <span className="font-bold text-[15px] uppercase">
                {user?.data?.fullName ? user.data.fullName.charAt(0) : "U"}
              </span>
            </div>
          ) : (
            <UserRound className="size-5" />
          )}
        </Link>
      </Button>

      <CartSidebar>
        <Button
          variant={"ghost"}
          className="rounded-full size-9 relative border border-white/25 bg-white/10 text-white hover:text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center p-0 shadow-xs"
          aria-label="Shopping Cart"
        >
          <ShoppingCart className="size-5" />
          <Badge className="bg-amber-400 text-slate-950 font-bold size-5 flex items-center justify-center text-[10px] absolute -top-1.5 -right-1.5 pointer-events-none rounded-full border-2 border-[rgba(9,33,67,1)] shadow-xs">
            {totalCartItem ?? 0}
          </Badge>
        </Button>
      </CartSidebar>
    </div>
  );
};

export default CartLinksAndAccount;
