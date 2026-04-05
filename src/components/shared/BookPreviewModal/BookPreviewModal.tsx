"use client";

import CommonModal from "@/components/shared/commonModal/CommonModal";
import PdfViewer from "./PdfViewer";

type Props = {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange(isOpen: boolean): void;
  previewLink: string;
  title?: string;
};

export default function BookPreviewModal({
  isOpen,
  onOpenChange,
  previewLink,
  title = "একটু পড়ুন",
}: Props) {
  const isIframeDomain =
    previewLink?.includes("drive.google.com") ||
    previewLink?.includes("youtube.com");

  return (
    <CommonModal
      open={isOpen}
      handleOpen={onOpenChange}
      modalTitle={`প্রিভিউ: ${title}`}
      className="max-w-[98vw] md:max-w-6xl w-full max-h-[95vh] p-2 md:p-6 overflow-hidden rounded-xl bg-white"
    >
      <div className="w-full h-[82vh] md:h-[80vh] bg-gray-100 rounded-md overflow-hidden relative flex flex-col">
        {previewLink ? (
          isIframeDomain ? (
            <iframe
              src={previewLink}
              className="w-full flex-1 border-0"
              title={title}
              allowFullScreen
            />
          ) : (
            <PdfViewer url={previewLink} />
          )
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center flex-col gap-4">
            <span className="text-4xl">📚</span>
            <p className="text-lg font-medium">
              দুঃখিত, এই বইয়ের কোনো প্রিভিউ বর্তমানে উপলব্ধ নেই।
            </p>
          </div>
        )}
      </div>
    </CommonModal>
  );
}
