import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getImageSrc } from "@/lib/utils";
import {
  ProductToClaim,
  setTableDataToClaim,
} from "@/redux/features/tableData/tableData";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { Product } from "../commonTypes/CommonTypes";
import WarrantyClaimHistory from "./WarrantyClaimHistory";
// type ValidCode = { code: string };
type Props = {
  searchResult: Product[];
  validCodes: string[];
  notFoundProducts: string[] | undefined;

  error: string | null;
};

const ProductTable = ({
  searchResult,

  validCodes,
  error,
}: Props) => {
  const productsWithWarranty: JSX.Element[] = [];
  const productsWithoutWarranty: JSX.Element[] = [];
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (error) {
    return (
      <div className="text-center text-destructive font-bold">{error}</div>
    );
  }

  // Split products based on warranty status
  searchResult.forEach((order, orderIndex) => {
    order.products.forEach((product, index) => {
      let warrantyStatus = "ওয়ারেন্টি প্রযোজ্য নয়";
      let remainingDays: number = -1;

      if (product.warranty) {
        const endDate = new Date(product?.warranty?.endsDate);
        const currentDate = new Date();
        remainingDays = Math.ceil(
          (endDate?.getTime() - currentDate?.getTime()) / (1000 * 3600 * 24)
        );
        warrantyStatus =
          remainingDays < 0 ? "মেয়াদ শেষ" : `${remainingDays} দিন বাকি`;
      }

      const warrantyStatusClass =
        remainingDays < 0 ? "text-destructive" : "text-success";

      const handleSingleClaimClick = () => {
        const applicableCodes =
          product.warranty?.warrantyCodes
            .map((wc) => wc.code)
            .filter((code) => validCodes.includes(code)) || [];

        if (applicableCodes.length === 0) return;

        const productToClaim: ProductToClaim = {
          warrantyCodes: applicableCodes,
          shippingDetails: order.shipping,
        };

        dispatch(setTableDataToClaim([productToClaim]));

        const queryParams = new URLSearchParams();
        queryParams.append("validCodes", JSON.stringify(applicableCodes));

        router.push(`/warranty/claim-your-warranty?${queryParams.toString()}`);
      };

      const productRow = (
        <TableRow
          key={`${orderIndex}-${index}`}
          className={orderIndex % 2 === 0 ? "bg-background" : "bg-muted"}
        >
          <TableCell className="px-2 md:px-4 py-3">
            <div className="w-12 h-12 md:w-16 md:h-16 relative border border-border rounded-md overflow-hidden bg-background">
              <Image
                layout="fill"
                objectFit="contain"
                src={getImageSrc(
                  product?.image?.src || product?.thumbnail?.src
                )}
                alt={product?.image?.alt || product?.thumbnail?.alt || ""}
                className="p-1"
              />
            </div>
          </TableCell>
          <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm font-semibold text-foreground">
            {product?.title}
            {product.attributes && (
              <div className="text-[10px] md:text-xs text-muted-foreground font-normal mt-1">
                {Object.entries(product.attributes)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </div>
            )}
          </TableCell>
          <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-center font-medium">
            &#2547;{product?.unitPrice?.toLocaleString()}
          </TableCell>
          <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-center text-muted-foreground">
            {product?.warranty
              ? `${product?.warranty?.startDate} — ${product?.warranty?.endsDate}`
              : "N/A"}
          </TableCell>
          <TableCell
            className={`px-2 md:px-4 py-3 ${warrantyStatusClass} text-xs md:text-sm text-center font-semibold`}
          >
            {warrantyStatus}
          </TableCell>
          <TableCell className="px-2 md:px-4 py-3 text-center">
            <WarrantyClaimHistory
              warrantyClaimHistory={product?.warrantyClaimHistory}
            />
          </TableCell>
          <TableCell className="px-2 md:px-4 py-3 text-right">
            {remainingDays >= 0 && (
              <button
                onClick={handleSingleClaimClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-bold py-1.5 px-3 md:px-4 rounded transition-colors shadow-sm"
              >
                ক্লেম করুন
              </button>
            )}
          </TableCell>
        </TableRow>
      );

      if (remainingDays >= 0) {
        productsWithWarranty.push(productRow);
      } else {
        productsWithoutWarranty.push(productRow);
      }
    });
  });

  // Removed handleClaimAllClick as claims are now per-item

  const renderTableHeader = () => (
    <TableRow className="bg-primary/5 font-bold text-xs md:text-sm text-primary">
      <TableCell className="px-2 md:px-4 py-3">ছবি</TableCell>
      <TableCell className="px-2 md:px-4 py-3">পণ্যের নাম</TableCell>
      <TableCell className="px-2 md:px-4 py-3 text-center">মূল্য</TableCell>
      <TableCell className="px-2 md:px-4 py-3 text-center">
        ওয়ারেন্টির মেয়াদ
      </TableCell>
      <TableCell className="px-2 md:px-4 py-3 text-center">অবস্থা</TableCell>
      <TableCell className="px-2 md:px-4 py-3 text-center">
        ক্লেম হিস্ট্রি
      </TableCell>
      <TableCell className="px-2 md:px-4 py-3 text-right pr-6">
        অ্যাকশন
      </TableCell>
    </TableRow>
  );

  return (
    <div className="overflow-x-auto mt-10">
      {productsWithWarranty.length > 0 ? (
        <div className="space-y-6">
          <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-background w-full md:w-[97%] mx-auto">
            <Table>
              <thead>{renderTableHeader()}</thead>
              <TableBody>{productsWithWarranty}</TableBody>
            </Table>
          </div>
          {/* Claim All button removed correctly */}
        </div>
      ) : (
        <p className="text-center text-destructive">
          ওয়ারেন্টিযুক্ত কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}

      {productsWithoutWarranty.length > 0 ? (
        <>
          <Table className="w-[90%] sm:w-[85%] mx-auto border-collapse border border-border mt-8">
            <thead>{renderTableHeader()}</thead>
            <TableBody>{productsWithoutWarranty}</TableBody>
          </Table>
          <div className="w-[90%] sm:w-[85%] mx-auto">
            <p className="w-full p-2 font-bold text-sm md:text-xl text-destructive text-center">
              এই পণ্যটিতে কোনো ওয়ারেন্টি সুবিধা নেই
            </p>
          </div>
        </>
      ) : (
        <p className="text-center">{""}</p>
      )}
    </div>
  );
};

export default ProductTable;
