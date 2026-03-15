import { TProduct } from "@/types/products/product";
import { TVariableProduct } from "@/types/products/variableProduct";
import ProductCardPrimary from "./ProductCardPrimary";
import VariableProductCard from "./VariableProductCard";
import { PRODUCT_TYPE } from "@/const/product.const";

type TProps = {
  product: TProduct;
  priority?: boolean;
};

const ProductCard = ({ product, priority = true }: TProps) => {
  if (product.type === PRODUCT_TYPE.VARIABLE) {
    // Cast to TVariableProduct as we know it's variable type
    // and TProduct now shares the structure or we cast for safety
    return (
      <VariableProductCard
        product={product as unknown as TVariableProduct}
        priority={priority}
      />
    );
  }
  return <ProductCardPrimary product={product} priority={priority} />;
};

export default ProductCard;
