import CTAButtonGroup from "../../../_components/CTAButtonGroup";

type Props = {
  onOrderClick?: () => void;
};

const FinalPsychologicalClose = ({ onOrderClick }: Props) => {
  return (
    <section className="bg-gray-900 py-6 lg:py-10 px-4 overflow-hidden relative border-t border-gray-800">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-6 lg:space-y-6">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <p className="text-sm font-black text-red-500 uppercase tracking-widest bg-red-900/30 px-4 py-1.5 rounded-full inline-block border border-red-800/50">
            শেষ কথা
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-[1.1]">
            অজ্ঞতা কখনো
            <br />
            <span className="text-red-500 mt-2 block">অজুহাত হতে পারে না</span>
          </h2>
        </div>

        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 lg:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>

          <div className="relative z-10">
            <div className="space-y-3 border-l-2 border-gray-700 pl-4 lg:pl-5">
              <p className="text-lg lg:text-xl font-bold text-gray-300 leading-relaxed">
                যে বিষয়ে আপনার জীবনের সবচেয়ে বড় গন্তব্য (আখিরাত) নির্ভর করছে,
                সেই বিষয়ে কি আপনি কোনো ঝুঁকি নিতে পারেন?
              </p>
              <p className="text-lg lg:text-xl font-bold text-gray-300 leading-relaxed">
                দুনিয়ার সাধারণ একটা গ্যাজেট কিনতে গিয়ে আপনি হয়তো ১০ বার রিভিউ
                পড়েন, মানুষের অভিজ্ঞতা শোনেন।
              </p>
              <p className="text-lg lg:text-xl font-black text-white leading-relaxed">
                কিন্তু দ্বীনের বিষয়ে, আপনি কি যাচাই করেছেন আপনি যে পথে আছেন তা
                নিরাপদ কিনা?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
              <h4 className="text-lg font-black text-red-400">
                যদি আপনি বইটি না পড়েন:
              </h4>
              <p className="text-base font-bold text-gray-400">
                আপনার বর্তমান অবস্থায় কোনো পরিবর্তন হবে না। আপনি হয়তো ভাবতেই
                থাকবেন আপনি ঠিক, কিন্তু যাচাই করার সুযোগটা হারালেন।
              </p>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl space-y-3">
              <h4 className="text-lg font-black text-emerald-400">
                আর যদি পড়েন:
              </h4>
              <p className="text-base font-bold text-emerald-100/70">
                হয়তো এই বইটি সেই দিকনির্দেশনা হবে, যা আপনাকে আজীবনের বিভ্রান্তি
                থেকে বাঁচিয়ে দেবে ইনশাআল্লাহ।
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-center px-4 max-w-xl mx-auto mt-6">
          <div className="inline-flex items-center justify-center p-0.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 mb-1">
            <div className="bg-gray-900 rounded-full px-5 py-1.5 text-white font-black text-sm uppercase tracking-widest">
              সিদ্ধান্ত এখন আপনার
            </div>
          </div>

          <h3 className="text-2xl font-black text-white">
            সত্যকে জানুন। নিজেকে নিরাপদ রাখুন।
          </h3>

          <p className="text-base font-bold text-gray-500 border-t border-gray-800 pt-5 mt-2">
            বইটি সংগ্রহ করে সত্যকে গভীরভাবে উপলব্ধি করুন। আপনার এই সামান্য সময় ও
            অর্থ হয়তো বড় কোনো ক্ষতি থেকে বাঁচার অন্যতম মাধ্যম হতে পারে।
          </p>
        </div>

        <div className="mt-8 flex justify-center pb-2 relative z-10">
          <CTAButtonGroup onOrderClick={onOrderClick!} />
        </div>
      </div>
    </section>
  );
};

export default FinalPsychologicalClose;
