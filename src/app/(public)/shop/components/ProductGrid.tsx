import ProductCard from "@/components/productCards/ProductCard";
import { TProduct } from "@/types/products/product";
import NoProductsFound from "./NoProductsFound";

type ProductGridProps = {
  products: TProduct[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
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
