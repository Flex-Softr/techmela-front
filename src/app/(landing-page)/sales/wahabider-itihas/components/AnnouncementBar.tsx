import { MdCampaign } from "react-icons/md";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-secondary-foreground py-2.5 text-sm font-semibold overflow-hidden relative flex flex-nowrap w-full">
      <div className="animate-marquee-slow flex gap-12 whitespace-nowrap w-min">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-2">
            <MdCampaign className="text-lg" /> সীমিত সময়ের অফার — স্টক শেষ
            হওয়ার আগেই এখনই অর্ডার করুন!
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
