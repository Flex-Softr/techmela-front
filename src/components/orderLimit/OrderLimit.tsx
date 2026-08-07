import { Dispatch, SetStateAction } from "react";
import CommonModal from "../shared/commonModal/CommonModal";

const OrderLimit = ({
  limitModalStatus,
  setLimitModalStatus,
}: {
  limitModalStatus: boolean;
  setLimitModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleLimitModal = () => {
    setLimitModalStatus((prev) => !prev);
  };
  return (
    <div>
      <CommonModal
        open={limitModalStatus}
        handleOpen={handleLimitModal}
        modalTitle="Reached order limit"
        className="min-h-[400px] w-[320px]"
      >
        <p className="text-justify">
          <p>Dear customer,</p>
          Thank you for trying to place another order! One of your orders has
          already been completed successfully. Please wait — our representative
          will call you within the scheduled time to confirm the order. If you
          need any assistance or would like to place another order soon, please
          contact us at the number below.
        </p>
        <p className="text-center">
          Contact: <br /> +8801967214215
        </p>
        <p className="text-center">
          Thank you for staying with us. We look forward to serving you!
        </p>
      </CommonModal>
    </div>
  );
};

export default OrderLimit;
