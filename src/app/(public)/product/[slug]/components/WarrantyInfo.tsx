"use client";

import EcButton from "@/components/shared/EcButton/EcButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SITE } from "@/const/site.const";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type WarrantyInfoProps = {
  warrantyInfo?: {
    duration?: { quantity: string; unit: string };
    details?: string;
  };
};

const WarrantyInfo: React.FC<WarrantyInfoProps> = ({ warrantyInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  // const closeModal = () => setIsOpen(false);

  const renderDuration = (duration: { quantity: string; unit: string }) => {
    return `${duration.quantity} ${duration.unit}`;
  };

  return (
    <div className="flex items-center gap-3">
      {warrantyInfo?.duration ? (
        <span className="text-foreground font-medium text-sm">
          {renderDuration(warrantyInfo.duration)}
        </span>
      ) : (
        <span className="text-muted-foreground text-sm italic">
          কোনো ওয়ারেন্টি নেই
        </span>
      )}
      <button
        className="px-3 py-0.5 text-xs font-semibold text-secondary bg-transparent hover:bg-secondary hover:text-primary-foreground rounded-md transition-colors border border-secondary"
        onClick={openModal}
      >
        বিস্তারিত দেখুন
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[90%] lg:w-[80%] max-w-4xl h-[80vh] md:h-[90vh] overflow-hidden rounded-lg shadow-lg">
          <DialogHeader className="flex items-center justify-between border-b">
            <DialogTitle className="text-xl font-semibold text-foreground">
              ওয়ারেন্টি সংক্রান্ত তথ্য
            </DialogTitle>
          </DialogHeader>

          <div className="h-full overflow-y-auto space-y-2">
            {/* Warranty Description */}
            <DialogDescription>
              <div className="space-y-4 text-foreground text-base leading-relaxed">
                <p>
                  সম্মানিত গ্রাহক, <br />
                  আমাদের পণ্যের মান ও আপনার সন্তুষ্টিই {SITE.nameBn}-এর মূল লক্ষ্য। প্রতিটি পণ্যের সাথে একটি ওয়ারেন্টি কোড নম্বর প্রদান করা হয়। ওয়ারেন্টি মেয়াদের মধ্যে পণ্যে কোনো ত্রুটি দেখা দিলে খুব সহজেই ওয়ারেন্টি ক্লেইম করতে পারবেন:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    আমাদের হটলাইন নম্বর, ফেসবুক পেজ বা ওয়েবসাইটের মাধ্যমে যোগাযোগ করুন।
                  </li>
                  <li>
                    পণ্যের ওয়ারেন্টি কোড নম্বর এবং অর্ডার করার সময় ব্যবহৃত মোবাইল নম্বরটি আমাদের জানান।
                  </li>
                  <li>
                    আমাদের প্রতিনিধি সমস্যাটি যাচাই করে দ্রুত একটি রিপ্লেসমেন্ট পণ্য পাঠিয়ে দেবেন।
                  </li>
                  <li>
                    ডেলিভারি ম্যানের কাছে সমস্যাযুক্ত পণ্যটি হস্তান্তর করে সহজেই নতুন পণ্যটি গ্রহণ করুন।
                  </li>
                  <li>
                    কুরিয়ার সার্ভিসের ভাষায় এই প্রক্রিয়াকে &quot;এক্সচেঞ্জ&quot; বলা হয়।
                  </li>
                </ul>
                <p>
                  <strong>বিশেষ দ্রষ্টব্য:</strong> <br />
                  আপনার কোড নম্বর এবং মোবাইল নম্বর আমাদের সিস্টেমে আপনার নামেই সংরক্ষিত থাকে, তাই নিশ্চিন্তে যেকোনো প্রয়োজনে আমাদের সেবা গ্রহণ করতে পারেন।
                </p>
              </div>
            </DialogDescription>

            {/* Video Section */}
            <div>
              <p className="text-sm md:text-base font-medium text-foreground mb-2">
                নিচের বাটনে ক্লিক করে খুব সহজে আমাদের ওয়েবসাইট থেকেও সরাসরি ওয়ারেন্টি ক্লেইম করতে পারেন:
              </p>
              <Link href="/warranty/find-your-product" target="_blank">
                <EcButton className="bg-secondary text-primary-foreground flex items-center gap-2 mt-4 hover:bg-secondary/90 transition-all font-semibold px-6 py-2 h-auto text-base">
                  ওয়ারেন্টি ক্লেইম করুন <FaArrowRight size={16} />
                </EcButton>
              </Link>
              <div className="text-center mt-7">
                <p className="text-base md:text-lg">
                  আপনার সন্তুষ্টিই আমাদের অনুপ্রেরণা।
                </p>
                <p className="font-bold text-base">{SITE.nameBn}</p>
                <p className="font-semibold">&quot;বিশ্বাসের প্রতীক&quot;</p>
              </div>
            </div>
          </div>

          <div className=" border-t flex justify-end">
            {/* <Button size="sm" onClick={closeModal}>
              Close
            </Button> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WarrantyInfo;
