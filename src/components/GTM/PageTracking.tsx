"use client";

import eventHandler from "@/tracking/eventHandler";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
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
