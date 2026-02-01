"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../pagination";
import CommonSelect from "../commonSelect/CommonSelect";

type PaginationProps = {
  currentPage?: number;
  totalItems: number;
  disabled?: boolean;
  className?: string;
  limit?: number; // optional override
};

const Paginate = ({
  currentPage = 1,
  totalItems,
  // disabled,
  className,
  limit = 12,
}: PaginationProps) => {
  const { setParam, getParam } = useQueryParams();

  const selectedPage = parseInt(getParam("page") || currentPage.toString());
  const perPage = parseInt(getParam("limit") || limit.toString());
  const totalPages = Math.ceil(totalItems / perPage);

  // if (totalPages <= 1) return null; // no pagination if 1 page only

  const createPaginationRange = () => {
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - selectedPage) <= 2) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  const handlePageChange = (page: number) => {
    setParam({ page: page.toString(), limit: perPage.toString() });
    // setQuery({ page, limit: perPage }); // update Redux/query state if needed
  };

  const showingFrom =
    perPage < totalItems ? (selectedPage - 1) * perPage + 1 : 1;
  const showingTo = Math.min(selectedPage * perPage, totalItems);

  return (
    <div
      className={cn("mt-5 flex justify-center items-center gap-3", className)}
    >
      <div className="flex gap-2 items-center justify-center">
        <div className="flex gap-2 items-center">
          <span>Show:</span>
          <CommonSelect
            size="sm"
            value={perPage.toString()}
            onChange={(val) => {
              setParam({ limit: val, page: perPage > totalItems ? "1" : "" });
            }}
            options={[
              { value: "12", label: "12" },
              { value: "24", label: "24" },
              { value: "36", label: "36" },
              { value: "48", label: "48" },
              { value: "60", label: "60" },
            ]}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Showing {showingFrom} to {showingTo} of {totalItems}
          </p>
        </div>
        <Pagination>
          <PaginationContent>
            {/* Prev button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                size={"sm"}
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedPage > 1) handlePageChange(selectedPage - 1);
                }}
                className={`cursor-pointer ${selectedPage === 1 ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>

            {/* Page numbers */}
            {createPaginationRange().map((item, idx) =>
              typeof item === "number" ? (
                <PaginationItem key={idx} className="cursor-pointer">
                  <PaginationLink
                    href="#"
                    size={"sm"}
                    isActive={selectedPage === item}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(item);
                    }}
                    className={`${selectedPage === item ? "bg-primary text-white" : ""}`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={idx}>
                  <span className="px-2">…</span>
                </PaginationItem>
              )
            )}

            {/* Next button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                size={"sm"}
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedPage < totalPages)
                    handlePageChange(selectedPage + 1);
                }}
                className={`cursor-pointer ${selectedPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Paginate;
