"use client";

import eventHandler from "@/tracking/eventHandler";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const PageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    if (lastTrackedUrl.current === url) {
      return;
    }

    lastTrackedUrl.current = url;

    const trackPage = async () => {
      // Trigger page_view event
      await eventHandler({
        event_name: "page_view",
      });
    };

    trackPage();
  }, [pathname, searchParams]);

  return null;
};

export default PageTracking;
