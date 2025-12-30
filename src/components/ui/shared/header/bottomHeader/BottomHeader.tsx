import ContainerMax from "@/components/containerMax/ContainerMax";
import TCategory from "@/types/categories/categories";
import MenuBar from "../menuBar/MenuBar";
const BottomHeader = ({ categories }: { categories?: TCategory[] }) => {
  return (
    <div className="py-1.5 border-b-[1px] hidden md:block mb-2 md:mb-0">
      <ContainerMax>
        <MenuBar categories={categories} isVertical={false} />
      </ContainerMax>
    </div>
  );
};

export default BottomHeader;
