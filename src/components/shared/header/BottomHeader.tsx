import ContainerMax from "@/components/shared/containerMax/ContainerMax";
import { Suspense } from "react";
import CategoryMenuBarFetcher from "./components/CategoryMenuBarFetcher";

const BottomHeader = () => {
  return (
    <div className="py-1 border-b-[1px] hidden md:block mb-2 md:mb-0">
      <ContainerMax>
        <Suspense
          fallback={
            <div className="flex justify-center gap-4 py-2 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 w-20 bg-gray-100 rounded" />
              ))}
            </div>
          }
        >
          <CategoryMenuBarFetcher />
        </Suspense>
      </ContainerMax>
    </div>
  );
};

export default BottomHeader;
