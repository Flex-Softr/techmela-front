import { SITE } from "@/const/site.const";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../shared/commonModal/CommonModal";

const OrderLimit = ({
  limitModalStatus,
  setLimitModalStatus,
}: {
  limitModalStatus: boolean;
  setLimitModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleLimitModal = () => {
    setLimitModalStatus((prev) => !prev);
  };
  return (
    <div>
      <CommonModal
        open={limitModalStatus}
        handleOpen={handleLimitModal}
        modalTitle="অর্ডার সংক্রান্ত তথ্য"
        className="min-h-[380px] w-[340px]"
      >
        <div className="text-justify space-y-2 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">সম্মানিত গ্রাহক,</p>
          <p>
            আমাদের ওয়েবসাইট থেকে অর্ডার করার জন্য ধন্যবাদ! আপনার একটি অর্ডার ইতোমধ্যে গ্রহণ করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন — আমাদের প্রতিনিধি দ্রুত সময়ের মধ্যে কল করে আপনার অর্ডারটি নিশ্চিত করবেন।
          </p>
          <p>
            জরুরি প্রয়োজনে অথবা নতুন অর্ডার সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করতে পারেন:
          </p>
        </div>
        <p className="text-center font-semibold text-slate-800 mt-4 text-sm">
          হটলাইন: <br />{" "}
          <a
            href={`tel:${SITE.phone}`}
            className="text-primary font-bold text-base hover:underline"
          >
            {SITE.phone}
          </a>
        </p>
        <p className="text-center text-xs text-slate-500 mt-3 font-medium">
          {SITE.nameBn}-এর সাথে থাকার জন্য ধন্যবাদ!
        </p>
      </CommonModal>
    </div>
  );
};

export default OrderLimit;
