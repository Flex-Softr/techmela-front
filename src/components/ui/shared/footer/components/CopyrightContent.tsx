import ContainerMax from "@/components/containerMax/ContainerMax";

const CopyrightContent = () => {
  return (
    <div className="bg-white py-2 md:py-4 border-t border-gray-300">
      <ContainerMax>
        <div className="flex flex-wrap justify-center md:justify-between">
          <div>
            <p className="text-text-muted-foreground text-sm font-medium">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-primary font-bold">Nora Life Style</span>.
              All rights reserved.
            </p>
          </div>
          <div>
            <p className="text-text-muted-foreground text-sm font-medium">
              Developed and maintained by{" "}
              <a
                href="https://flexsoftr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline"
              >
                Flex Softr
              </a>
            </p>
          </div>
        </div>
      </ContainerMax>
    </div>
  );
};

export default CopyrightContent;
