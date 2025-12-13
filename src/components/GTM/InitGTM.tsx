import config from "@/config/config";
import { GoogleTagManager } from "@next/third-parties/google";

const InitGTM = () => {
  const gtmId = config.gtm_id;
  if (!gtmId) {
    return null;
  }
  return <GoogleTagManager gtmId={gtmId} />;
};

export default InitGTM;
