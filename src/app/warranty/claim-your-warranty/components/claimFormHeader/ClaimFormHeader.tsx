import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../../public/images/logo/logo.jpg";
const ClaimFormHeader = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between ">
        <Link href="/">
          <Image
            width={150}
            height={60}
            src={logo}
            className="mt-2 w-20 md:w-40"
            alt={""}
          ></Image>
        </Link>
        <div className="text-end xms:text-xs xls:text-xs sm:text-sm md:text-xl">
          <p>Nora life style</p>
          <p>Dhaka, bangladesh</p>
          <p>+88019xxxxxxx</p>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default ClaimFormHeader;
