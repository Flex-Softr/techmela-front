import { MdCheckCircle, MdMenuBook, MdStar, MdVerified } from "react-icons/md";

type Props = {
  pages: string;
  scholars: string;
};

const BookStats = ({ pages, scholars }: Props) => {
  const stats = [
    {
      value: pages,
      label: "পৃষ্ঠা সংখ্যা",
      icon: <MdMenuBook className="text-3xl mx-auto mb-2" />,
    },
    {
      value: scholars,
      label: "ইমাম ও মনীষীর মত",
      icon: <MdVerified className="text-3xl mx-auto mb-2" />,
    },
    {
      value: "৫/৫",
      label: "পাঠক রেটিং",
      icon: <MdStar className="text-3xl mx-auto mb-2" />,
    },
    {
      value: "২ পর্ব",
      label: "সুবিন্যস্ত অধ্যায়",
      icon: <MdCheckCircle className="text-3xl mx-auto mb-2" />,
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm"
            >
              {stat.icon}
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookStats;
