import { TSingleProduct } from "@/types/products/singleProduct";

const ProductDetails = ({ product }: { product?: TSingleProduct }) => {
  return (
    <div className="space-y-10">
      {product?.description && (
        <section>
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Description
          </h3>
          <div
            className="prose max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
        </section>
      )}

      {product?.additionalInfo && (
        <section>
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Additional information
          </h3>
          <div
            className="prose max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: product.additionalInfo,
            }}
          ></div>
        </section>
      )}

      {product?.usageGuidelines && (
        <section>
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Usage guidelines
          </h3>
          <div
            className="prose max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: product.usageGuidelines,
            }}
          ></div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
