import CommonModal from "@/components/commonModal/CommonModal";
import React from "react";
import { TWarrantyClaimHistory } from "../commonTypes/CommonTypes";

const WarrantyClaimHistory = ({
  warrantyClaimHistory,
}: {
  warrantyClaimHistory?: TWarrantyClaimHistory;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((open) => !open);
  return (
    <>
      <button
        className="text-primary hover:text-primary/70 transition-colors p-1"
        onClick={() => setOpen(true)}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <CommonModal
        open={open}
        handleOpen={handleOpen}
        modalTitle="Warranty Claim History"
        className="min-h-[300px] w-[400px]"
      >
        <div>
          {warrantyClaimHistory?.claims?.length ? (
            <table className="border-collapse">
              {/* <caption className="py-2">Warranty claim history</caption> */}
              <tbody>
                <tr>
                  <th className="border-2 px-5 py-3">S/N</th>
                  <th className="border-2 px-5 py-3">Date</th>
                  <th className="border-2 px-5 py-3">Claimed Codes</th>
                </tr>
                {warrantyClaimHistory?.claims?.map((claim, index) => (
                  <tr key={claim._id}>
                    <td className="border-2 px-5 py-3">{index + 1}</td>
                    <td className="border-2 px-5 py-3">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(claim?.createdAt))}
                    </td>
                    <td className="border-2 px-5 py-3">
                      {claim?.claimedCodes?.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2 className="text-green-600 font-bold">
              No previous warranty claims.
            </h2>
          )}
        </div>
      </CommonModal>
    </>
  );
};

export default WarrantyClaimHistory;
