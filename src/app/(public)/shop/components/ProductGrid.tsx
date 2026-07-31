import ProductCard from "@/components/productCards/ProductCard";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/products/product";
import NoProductsFound from "./NoProductsFound";

type ProductGridProps = {
  products: TProduct[];
  gridClassName?: string;
};

const ProductGrid = ({ products, gridClassName }: ProductGridProps) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <div
      className={cn(
        "mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 lg:gap-3",
        gridClassName
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} priority={index < 5} />
      ))}
    </div>
  );
};

export default ProductGrid;
