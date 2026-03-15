import ProductCard from "@/components/productCards/ProductCard";
import ProductGridSkeleton from "@/components/productCards/ProductGridSkeleton";
import { TProduct } from "@/types/products/product";
import NoProductsFound from "./NoProductsFound";

type ProductGridProps = {
  products: TProduct[];
  isLoading: boolean;
  isFetching: boolean;
};

const ProductGrid = ({ products, isLoading, isFetching }: ProductGridProps) => {
  if (isLoading || isFetching) {
    return (
      <ProductGridSkeleton
        count={6}
        className="lg:grid-cols-3"
        itemClassName="h-80"
      />
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 justify-between mt-5">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} priority={index < 4} />
      ))}
    </div>
  );
};

export default ProductGrid;
