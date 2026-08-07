"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  url: string;
};

export default function PdfViewer({ url }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    // Append toolbar control parameters to the URL natively
    let finalUrl = url.includes("#") ? url : `${url}#toolbar=0`;

    // Detect mobile browser since they don't have native PDF viewers for iframes
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // If mobile, wrap the URL with Google Docs Viewer to force inline display
    if (isMobile) {
      // NOTE: This requires 'url' to be publicly accessible over the internet
      finalUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
        url
      )}&embedded=true`;
    }

    setPdfUrl(finalUrl);
  }, [url]);

  return (
    <div className="flex w-full h-full flex-col bg-muted relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground bg-muted z-20">
          <Loader2 className="animate-spin text-primary" size={32} />
          <p className="font-semibold text-sm">Loading preview...</p>
        </div>
      )}

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-full border-none z-10"
          onLoad={() => setIsLoading(false)}
          title="PDF Preview"
        />
      )}

      {/* Overlay to disable right-click and some interactions for protection if needed */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
    </div>
  );
}
