import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbProps = {
  paths: { name: string; url: string }[];
};

const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <Breadcrumb className="p-2 pt-0 border-b w-full ">
      <BreadcrumbList className="flex items-center space-x-2 text-sm md:text-base">
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={path.url}
                className="flex items-center text-muted-foreground hover:text-primary text-sm font-semibold"
              >
                {index === 0 && <FaHome className="mr-2" />}
                {path.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== paths.length - 1 && (
              <BreadcrumbSeparator>
                <FaChevronRight className="text-muted-foreground" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
