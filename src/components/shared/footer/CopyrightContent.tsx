import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const CopyrightContent = () => {
  return (
    <div className="py-4 border-t border-border">
      <ContainerMax>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
          <div>
            <p className="text-foreground transition-colors text-sm font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-foreground font-bold">ShajGhor</span>.
              সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
          <div>
            <p className="text-foreground transition-colors text-sm font-medium text-center md:text-right">
              Developed and maintained by{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-bold hover:text-primary hover:underline transition-colors relative z-[60]"
              >
                FlexSoftr
              </a>
            </p>
          </div>
        </div>
      </ContainerMax>
    </div>
  );
};

export default CopyrightContent;
