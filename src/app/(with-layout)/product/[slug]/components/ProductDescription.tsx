import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TSingleProduct } from "@/types/products/singleProduct";

const ProductDescription = ({ product }: { product?: TSingleProduct }) => {
  if (!product) return null;

  const { description, usageGuidelines } = product;
  const hasDescription = !!description;
  const hasUsageGuidelines = !!usageGuidelines;

  if (!hasDescription && !hasUsageGuidelines) return null;

  return (
    <div>
      <Tabs defaultValue={hasDescription ? "description" : "usage"}>
        <TabsList className="bg-transparent border-b rounded-none h-auto p-0 w-full justify-start gap-8">
          {hasDescription && (
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 text-lg font-semibold text-muted-foreground data-[state=active]:text-foreground transition-all"
            >
              Description
            </TabsTrigger>
          )}
          {hasUsageGuidelines && (
            <TabsTrigger
              value="usage"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-2 text-lg font-semibold text-muted-foreground data-[state=active]:text-foreground transition-all"
            >
              Usage guidelines
            </TabsTrigger>
          )}
        </TabsList>

        <div className="mt-6">
          {hasDescription && (
            <TabsContent value="description">
              <div
                className="prose max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            </TabsContent>
          )}

          {hasUsageGuidelines && (
            <TabsContent value="usage">
              <div
                className="prose max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: usageGuidelines,
                }}
              ></div>
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default ProductDescription;
