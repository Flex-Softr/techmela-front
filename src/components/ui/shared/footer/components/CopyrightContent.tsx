import ContainerMax from "@/components/containerMax/ContainerMax";

const CopyrightContent = () => {
  return (
    <div className="py-2 md:py-4 border-t border-gray-300">
      <ContainerMax>
        <div className="flex flex-wrap justify-center md:justify-between">
          <div>
            <p className="text-text-muted-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-primary-foreground font-bold">
                Nora Life Style
              </span>
              . All rights reserved.
            </p>
          </div>
          <div>
            <p className="text-text-muted-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Developed and maintained with ❤️ by{" "}
              <a
                href="https://flexsoftr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground font-bold hover:underline transition-colors"
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
