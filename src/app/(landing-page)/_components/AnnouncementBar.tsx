import { MdCampaign } from "react-icons/md";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm font-semibold overflow-hidden relative flex flex-nowrap w-full">
      <div className="animate-marquee-slow flex gap-8 whitespace-nowrap w-min">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-2">
            <MdCampaign className="text-lg" />
            Order now to get the best discount — easy return policy — free
            delivery on orders over ৳2000
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 70s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
