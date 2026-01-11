import { TProduct } from "@/types/products/product";
import { TVariableProduct } from "@/types/products/variableProduct";
import ProductCardPrimary from "./ProductCardPrimary";
import VariableProductCard from "./VariableProductCard";
import { PRODUCT_TYPE } from "@/const/product.const";

type TProps = {
  product: TProduct;
};

const ProductCard = ({ product }: TProps) => {
  if (product.type === PRODUCT_TYPE.VARIABLE) {
    // Cast to TVariableProduct as we know it's variable type
    // and TProduct now shares the structure or we cast for safety
    return (
      <VariableProductCard product={product as unknown as TVariableProduct} />
    );
  }
  return <ProductCardPrimary product={product} />;
};

export default ProductCard;
