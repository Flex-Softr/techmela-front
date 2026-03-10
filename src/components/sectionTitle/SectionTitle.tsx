import Link from "next/link";
import { IoIosArrowDroprightCircle } from "react-icons/io";
const SectionTitle = ({
  title,
  href,
  linkText,
}: {
  title: string;
  href?: string;
  linkText?: string;
}) => {
  return (
    <div className="px-2">
      <div
        className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-1 ${
          href ? "" : "block"
        }`}
      >
        <h2 className="text-secondary font-semibold border-b-2 border-primary py-2 sm:py-3 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h2>
        {href ? (
          <div className="flex justify-end">
            <Link
              href={href}
              className="text-primary flex items-center gap-2 font-semibold text-sm sm:text-base hover:underline transition-all"
            >
              {linkText ?? "See all"}
              <IoIosArrowDroprightCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            </Link>
          </div>
        ) : null}
      </div>
      <hr />
    </div>
  );
};

export default SectionTitle;
