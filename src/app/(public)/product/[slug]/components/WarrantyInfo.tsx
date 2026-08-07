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
          No warranty available
        </span>
      )}
      <button
        className="px-3 py-0.5 text-xs font-semibold text-secondary bg-transparent hover:bg-secondary hover:text-primary-foreground rounded-md transition-colors border border-secondary"
        onClick={openModal}
      >
        View Details
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[90%] lg:w-[80%] max-w-4xl h-[80vh] md:h-[90vh] overflow-hidden rounded-lg shadow-lg">
          <DialogHeader className="flex items-center justify-between  border-b">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Warranty Information
            </DialogTitle>
          </DialogHeader>

          <div className="h-full overflow-y-auto space-y-2">
            {/* Warranty Description */}
            <DialogDescription>
              <div className="space-y-4 text-foreground">
                <p>
                  Dear customer, <br />
                  Building your trust and satisfaction with our products is{" "}
                  {SITE.nameBn}&apos;s primary goal. Every product includes a
                  warranty code number. If your product is damaged within the
                  warranty period, follow the steps below to claim your warranty
                  easily:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Contact us via our hotline number, Facebook page, or
                    website.
                  </li>
                  <li>
                    Share the product code number and the mobile number used for
                    the order.
                  </li>
                  <li>
                    Our representative will review the issue and quickly send
                    you a replacement product.
                  </li>
                  <li>
                    Simply hand the damaged product to the delivery person and
                    receive the new one with ease.
                  </li>
                  <li>
                    In courier terms, this process is called an
                    &quot;exchange.&quot;
                  </li>
                </ul>
                <p>
                  <strong>Note:</strong> <br />
                  Your code number and mobile number will be registered under
                  your name in our system, so you can use our service with
                  confidence.
                </p>
              </div>
            </DialogDescription>

            {/* Video Section */}
            <div>
              <p className="text-sm md:text-lg font-medium text-foreground mb-2">
                You can also claim your warranty easily through our website by
                clicking the link below.
              </p>
              <Link href="/warranty/find-your-product" target="_blank">
                <EcButton className="bg-secondary text-primary-foreground flex items-center gap-2 mt-4 hover:bg-secondary/90 transition-all font-semibold px-6 py-2 h-auto text-base">
                  Claim Warranty <FaArrowRight size={16} />
                </EcButton>
              </Link>
              {/* video if need  */}
              {/* <div className="w-full border rounded-lg overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/YjhiCrCmpwY"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div> */}
              <div className="text-center mt-7 ">
                <p className="text-base md:text-lg">
                  Your satisfaction is our inspiration.
                </p>
                <p className="font-bold text-base">ShajGhor</p>
                <p className="font-semibold">&quot;A Symbol of Trust&quot;</p>
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
