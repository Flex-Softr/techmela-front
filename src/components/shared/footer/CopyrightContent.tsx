import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const CopyrightContent = () => {
  return (
    <div className="py-4 border-t border-primary/20">
      <ContainerMax>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
          <div>
            <p className="text-primary transition-colors text-sm font-medium text-center md:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-primary font-bold">
                সিদ্দীকিয়া প্রকাশনী
              </span>
              . সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
          <div>
            <p className="text-primary transition-colors text-sm font-medium text-center md:text-right">
              Developed and maintained by{" "}
              <a
                href="https://www.facebook.com/mustakimfb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:underline transition-colors relative z-[60]"
              >
                Mustakim Khan
              </a>
            </p>
          </div>
        </div>
      </ContainerMax>
    </div>
  );
};

export default CopyrightContent;
