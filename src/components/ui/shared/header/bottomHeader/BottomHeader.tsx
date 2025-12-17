"use client";
import ContainerMax from "@/components/containerMax/ContainerMax";
import TCategory from "@/types/categories/categories";
import { usePathname } from "next/navigation";
import MenuBar from "../menuBar/MenuBar";
const BottomHeader = ({ categories }: { categories?: TCategory[] }) => {
  const pathname = usePathname();
  return (
    <div className="py-2 border-b-[1px] hidden bg-primary md:block">
      <ContainerMax>
        <MenuBar
          categories={categories}
          activePath={pathname}
          isVertical={false}
        />
      </ContainerMax>
    </div>
  );
};

export default BottomHeader;
