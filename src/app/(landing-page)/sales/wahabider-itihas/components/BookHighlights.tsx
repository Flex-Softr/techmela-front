type Highlight = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  highlights: Highlight[];
};

const BookHighlights = ({ highlights }: Props) => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-3">
          এই বইয়ে কী আছে?
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto text-base">
          ওয়াহাবী মতাদর্শ ও তার ইতিহাস সম্পর্কে সবচেয়ে প্রামাণিক ও সুবিন্যস্ত
          বাংলা গ্রন্থ।
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <span className="text-4xl flex-shrink-0 p-4 mx-auto bg-gray-50 rounded-full text-primary w-min">
                {item.icon}
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookHighlights;
