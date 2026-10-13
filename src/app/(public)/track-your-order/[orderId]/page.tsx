import type { Metadata } from "next";
import TrackOrderDetails from "../components/TrackOrderDetails";

export const metadata: Metadata = {
  title: "অর্ডার ট্র্যাকিং বিবরণ | TechMela",
  description: "আপনার অর্ডারের বর্তমান অবস্থা ও বিস্তারিত ট্র্যাকিং তথ্য জানুন।",
};

const page = () => {
  return (
    <div>
      <TrackOrderDetails />
    </div>
  );
};

export default page;
