"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

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
        <span className="text-gray-700 font-medium text-sm">
          {renderDuration(warrantyInfo.duration)}
        </span>
      ) : (
        <span className="text-muted-foreground text-sm italic">
          No warranty available
        </span>
      )}
      <button
        className="px-3 py-0.5 text-xs font-semibold text-secondary bg-transparent hover:bg-secondary hover:text-white rounded-md transition-colors border border-secondary"
        onClick={openModal}
      >
        View Details
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[90%] lg:w-[80%] max-w-4xl h-[80vh] md:h-[90vh] overflow-hidden rounded-lg shadow-lg">
          <DialogHeader className="flex items-center justify-between  border-b">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Warranty Information
            </DialogTitle>
          </DialogHeader>

          <div className="h-full overflow-y-auto space-y-2">
            {/* Warranty Description */}
            <DialogDescription>
              <div className="space-y-4 text-gray-700">
                <p>
                  প্রিয় গ্রাহক, <br />
                  আমাদের পণ্যের উপর আপনার আস্থা এবং সন্তুষ্টি নিশ্চিত করাই Nora
                  life style-এর প্রধান লক্ষ্য। আমাদের প্রতিটি প্রোডাক্টে একটি
                  ওয়ারেন্টি কোড নম্বর রয়েছে। যার মাধ্যমে নির্দিষ্ট ওয়ারেন্টি
                  মেয়াদের ভিতরে আপনার প্রোডাক্টটি যদি নষ্ট হয়, তাহলে খুব সহজে
                  ওয়ারেন্টির সুবিধা গ্রহণ করতে নিচের নির্দেশনা অনুসরণ করুন:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    আমাদের হটলাইন নাম্বার, ফেসবুক পেজ বা ওয়েবসাইটের মাধ্যমে
                    আমাদের সাথে যোগাযোগ করুন।
                  </li>
                  <li>
                    পণ্যের কোড নাম্বারটি এবং অর্ডারকৃত মোবাইল নাম্বারটি আমাদের
                    জানিয়ে দিন।
                  </li>
                  <li>
                    আমাদের প্রতিনিধি আপনার প্রোডাক্টের সমস্যা বিবেচনা করে দ্রুত
                    আপনার কাছে একটি নতুন প্রোডাক্ট পাঠিয়ে দিবে।
                  </li>
                  <li>
                    ডেলিভারি ম্যানের হাতে নষ্ট প্রোডাক্টটি দিয়ে নতুন
                    প্রোডাক্টটি রিসিভ করতে পারবেন খুব সহজেই।
                  </li>
                  <li>
                    এই পদ্ধতিকে কুরিয়ারের ভাষায় &quot;এক্সেঞ্জ&quot; বলা হয়।
                  </li>
                </ul>
                <p>
                  <strong>দ্রষ্টব্য:</strong> <br />
                  আপনার কোড নাম্বার এবং মোবাইল নাম্বারটি আপনার নামে আমাদের
                  কম্পিউটার সিস্টেমে রেজিস্টার করা থাকবে। তাই আপনি নিশ্চিন্তে
                  আমাদের সেবা গ্রহণ করতে পারবেন।
                </p>
              </div>
            </DialogDescription>

            {/* Video Section */}
            <div>
              <p className="text-sm md:text-lg font-medium text-gray-800 mb-2">
                এছাড়াও খুব সহজে ওয়েবসাইটের মাধ্যমে ওয়ারেন্টি সুবিধা গ্রহণ করতে
                নিচের ভিডিওটি অনুসরণ করুন।
              </p>
              <div className="w-full border rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/YjhiCrCmpwY"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="text-center mt-7 ">
                <p className="text-base md:text-lg">
                  আপনার সন্তুষ্টিই আমাদের অনুপ্রেরণা।
                </p>
                <p className="font-bold text-base">Nora life style</p>
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
