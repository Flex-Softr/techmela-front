export const PRODUCT_TYPE = {
  SIMPLE: "simple",
  VARIABLE: "variable",
} as const;

export const STOCK_STATUS = {
  IN_STOCK: "in_stock",
  LOW_STOCK: "low_stock",
  OUT_OF_STOCK: "out_of_stock",
} as const;

export const STOCK_STATUS_LABEL = {
  [STOCK_STATUS.IN_STOCK]: "In stock",
  [STOCK_STATUS.LOW_STOCK]: "Low stock",
  [STOCK_STATUS.OUT_OF_STOCK]: "Out of stock",
} as const;

export type TStockStatus = (typeof STOCK_STATUS)[keyof typeof STOCK_STATUS];

export const formatStockStatus = (status: TStockStatus) =>
  STOCK_STATUS_LABEL[status];

export const STOCK_STATUS_COLOR = {
  [STOCK_STATUS.IN_STOCK]: "text-green-700",
  [STOCK_STATUS.LOW_STOCK]: "text-yellow-700",
  [STOCK_STATUS.OUT_OF_STOCK]: "text-red-700",
} as const;

export function stockStatusColor(status: TStockStatus) {
  return STOCK_STATUS_COLOR[status];
}
