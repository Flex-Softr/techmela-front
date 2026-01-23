import config from "@/config/config";
import { TGtmEventParameter } from "@/types/GTM/gtmEventHandler";
import { sendGTMEvent } from "@next/third-parties/google";
import { hashUserData } from "./hashUserData";

const gtmEventHandler = (eventData: TGtmEventParameter) => {
  const event_id = Date.now() + Math.random().toString(36).substring(2, 9);

  const data: TGtmEventParameter = {
    ...eventData,
    timestamp: Math.floor(Date.now() / 1000),
    event_id,
    em: eventData.em ? hashUserData(eventData.em) : undefined,
    ph: eventData.ph ? hashUserData(eventData.ph) : undefined,
  };
  sendGTMEvent(data);
  // Send server event to Next.js API route for Facebook Conversions API
  fetch(`${config.tracking_base_url}/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  }).catch((_error) => {});
};

export default gtmEventHandler;
