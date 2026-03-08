import { Fragment } from "react";
import Link from "next/link";
import { FaBagShopping, FaLocationDot } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
const TopHeader = () => {
  const links = [
    {
      href: "/store-location",
      name: "আউটলেটসমূহ",
      icon: <FaLocationDot className="size-4 text-primary" />,
    },
    {
      href: "/track-your-order",
      name: "অর্ডার ট্র্যাক করুন",
      icon: <MdDeliveryDining className="size-5 text-primary" />,
    },
    {
      href: "/shop",
      name: "শপ",
      icon: <FaBagShopping className="size-4 text-primary" />,
    },
  ];
  return (
    <>
      <div className="hidden md:flex justify-end xl:px-10 py-1.5 bg-gray-50/50">
        <div className="flex gap-4 items-center">
          {links.map((link, index) => (
            <Fragment key={index}>
              <Link
                href={link.href}
                className="flex gap-1.5 items-center text-[13px] text-muted-foreground font-semibold hover:text-primary transition-all underline-offset-4 hover:underline"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
              {index !== links.length - 1 ? (
                <span className="text-gray-300">|</span>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
      <hr className="border-gray-100" />
    </>
  );
};

export default TopHeader;
