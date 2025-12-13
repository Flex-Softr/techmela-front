import { TGtmEventParameter, TGtmEvents } from "@/types/GTM/gtmEventHandler";
import { sendGTMEvent } from "@next/third-parties/google";

const gtmEventHandler = (
  gtmEvents: TGtmEvents,
  additionalData: TGtmEventParameter
) => {
  sendGTMEvent({
    event: gtmEvents,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
};

export default gtmEventHandler;
