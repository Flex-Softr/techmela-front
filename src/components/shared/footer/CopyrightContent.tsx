import ContainerMax from "@/components/shared/containerMax/ContainerMax";

const CopyrightContent = () => {
  return (
    <div className="py-2 md:py-4 border-t border-gray-300">
      <ContainerMax>
        <div className="flex flex-wrap justify-center md:justify-between">
          <div>
            <p className="text-text-muted-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-primary-foreground font-bold">
                সিদ্দীকিয়া প্রকাশনী
              </span>
              . All rights reserved.
            </p>
          </div>
          <div className="md:pr-16">
            <p className="text-text-muted-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium">
              Developed and maintained with ❤️ by{" "}
              <a
                href="https://www.facebook.com/mustaqimkhanbd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground font-bold hover:underline transition-colors relative z-[60]"
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
