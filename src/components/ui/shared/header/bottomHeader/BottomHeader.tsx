import ContainerMax from "@/components/containerMax/ContainerMax";
import TCategory from "@/types/categories/categories";
import CategoryMenuBar from "../menuBar/CategoryMenuBar";
// import MenuBar from "../menuBar/MenuBar";

const BottomHeader = ({ categories }: { categories?: TCategory[] }) => {
  return (
    <div className="py-1 border-b-[1px] hidden md:block mb-2 md:mb-0">
      <ContainerMax>
        {/* <MenuBar categories={categories} /> */}
        <CategoryMenuBar categories={categories} />
      </ContainerMax>
    </div>
  );
};

export default BottomHeader;
