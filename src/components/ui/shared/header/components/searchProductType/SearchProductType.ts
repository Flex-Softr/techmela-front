import { TProduct } from "@/types/products/product";
import { TVariableProduct } from "@/types/products/variableProduct";

export type ApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  isLoading: boolean;
  isError: boolean;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: TProduct[] | TVariableProduct[];
};
