import { FaQuoteLeft } from "react-icons/fa";
import { MdStar } from "react-icons/md";

type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

type Props = {
  testimonials: Testimonial[];
};

const Testimonials = ({ testimonials }: Props) => {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          পাঠক প্রতিক্রিয়া
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl relative">
              <FaQuoteLeft className="text-primary/20 text-4xl absolute top-6 left-6" />
              <div className="relative z-10">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <MdStar key={j} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  &quot;{t.text}&quot;
                </p>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
