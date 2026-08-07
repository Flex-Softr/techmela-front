"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  url: string;
};

export default function PdfViewer({ url }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  // Append toolbar control parameters to the URL
  // #toolbar=0&navpanes=0&scrollbar=0 is a common way to suggest the PDF viewer hide controls
  const pdfUrl = url.includes("#") ? url : `${url}#toolbar=0`;

  return (
    <div className="flex w-full h-full flex-col bg-muted relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground bg-muted z-20">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="font-semibold text-sm">Loading preview...</p>
        </div>
      )}

      {/* 
          Using an iframe is a much more robust approach for modern browsers 
          compared to react-pdf for simple viewing, as it leverages the 
          browser's native PDF viewing engine without complex JS workers.
      */}
      <iframe
        src={pdfUrl}
        className="w-full h-full border-none z-10"
        onLoad={() => setIsLoading(false)}
        title="PDF Preview"
      />

      {/* Overlay to disable right-click and some interactions for protection if needed */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
    </div>
  );
}
