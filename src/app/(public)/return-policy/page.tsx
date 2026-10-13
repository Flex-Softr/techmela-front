import Image from "next/image";
import {
  FaCheckCircle,
  FaClock,
  FaPhoneAlt,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";

export const metadata = {
  title: "রিটার্ন ও রিফান্ড পলিসি | TechMela",
  description: "TechMela-র রিটার্ন ও রিফান্ড পলিসি। যেকোনো সমস্যা বা ত্রুটির ক্ষেত্রে সহজে পণ্য রিটার্ন ও অর্থ ফেরত পাওয়ার নিয়মাবলী।",
};

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Premium Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Custom Brand Image with Overlay */}
        <Image
          src="/images/return_hero_new.webp"
          alt="রিটার্ন পলিসি"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-4 tracking-tight">
            রিটার্ন ও রিফান্ড পলিসি
          </h1>
          <div className="h-1.5 w-16 bg-background/30 mx-auto rounded-full mb-3" />
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            গ্রাহকদের সন্তুষ্টিই আমাদের সর্বোচ্চ অগ্রাধিকার। নিচে আমাদের রিটার্ন ও রিফান্ড সংক্রান্ত নিয়মাবলী উল্লেখ করা হলো।
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 max-w-5xl py-6 md:py-8">
        {/* Introduction Card */}
        <section className="bg-background rounded-[1.5rem] p-5 md:p-6 shadow-xl shadow-foreground/5 mb-6 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <FaUndoAlt size={20} />
            </span>
            ভূমিকা
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            সম্মানিত গ্রাহক! TechMela সর্বদা সেরা গ্রাহকসেবা প্রদানে অঙ্গীকারবদ্ধ। ক্রয়কৃত পণ্যে কোনো ত্রুটি বা সমস্যা থাকলে আমাদের নীতিমালা অনুযায়ী সহজে রিটার্ন সুবিধা গ্রহণ করতে পারবেন।
          </p>
        </section>

        {/* Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Timeline Card */}
          <div className="bg-background rounded-2xl p-5 md:p-6 border border-border shadow-lg shadow-foreground/5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <FaClock size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              রিটার্নের সময়সীমা
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              পণ্য রিসিভ করার পর কোনো সমস্যা দেখা দিলে অবশ্যই{" "}
              <span className="text-primary font-bold">২৪ ঘণ্টার মধ্যে</span>{" "}
              আমাদের জানাতে হবে।
            </p>
          </div>

          <div className="bg-background rounded-2xl p-5 md:p-6 border border-border shadow-lg shadow-foreground/5">
            <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center text-warning mb-6">
              <FaPhoneAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              কীভাবে রিটার্ন করবেন
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              সঠিক কারণ ও আনবক্সিং ভিডিও/ছবির প্রমাণসহ আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন এবং প্রয়োজনীয় নির্দেশনা মেনে চলুন।
            </p>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Eligibility Card */}
          <section className="bg-success/10/50 rounded-[1.5rem] p-6 md:p-8 border border-success/20 shadow-sm relative overflow-hidden">
            <FaCheckCircle className="absolute -right-6 -bottom-6 text-primary/30/30 text-9xl rotate-12" />
            <h2 className="text-2xl font-bold text-primary mb-8 border-b border-success/20 pb-4">
              যেসব ক্ষেত্রে রিটার্ন প্রযোজ্য:
            </h2>
            <ul className="space-y-4">
              {[
                "ত্রুটিপূর্ণ পণ্য: পণ্য বা প্যাকেজিংয়ে প্রস্তুতকারক সংক্রান্ত কোনো ত্রুটি পাওয়া গেলে।",
                "ভুল পণ্য ডেলিভারি: অর্ডারকৃত পণ্যের পরিবর্তে ভুল কোনো পণ্য পাঠানো হলে।",
                "ডেলিভারি ড্যামেজ: কুরিয়ারে পরিবহনের সময় পণ্য ক্ষতিগ্রস্ত বা ভেঙে গেলে।",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-primary">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-success/100 shrink-0" />
                  <span className="font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Rejection Card */}
          <section className="bg-destructive/5 rounded-[1.5rem] p-6 md:p-8 border border-destructive/15 shadow-sm relative overflow-hidden">
            <FaTimesCircle className="absolute -right-6 -bottom-6 text-destructive/20 text-9xl -rotate-12" />
            <h2 className="text-2xl font-bold text-destructive mb-8 border-b border-destructive/15 pb-4">
              যেসব ক্ষেত্রে রিটার্ন গ্রহণযোগ্য নয়:
            </h2>
            <ul className="space-y-4">
              {[
                "পণ্য ব্যবহার করা হলে বা সিল/প্যাকেজিং নষ্ট বা খোলা হলে।",
                "মূল ইনভয়েস, বক্স বা এক্সেসরিজ হারিয়ে গেলে বা ক্ষতিগ্রস্ত হলে।",
                "পণ্য গ্রহণের ২৪ ঘণ্টার সময়সীমা পার হওয়ার পর অভিযোগ জানানো হলে।",
                "স্পেশাল ছাড় বা ক্লিয়ারেন্স অফারে কেনা পণ্যের ক্ষেত্রে।",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-destructive"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-destructive shrink-0" />
                  <span className="font-light leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Refund Process */}
        <section className="bg-primary text-primary-foreground rounded-[1.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden border-b-4 border-warning/30">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            রিফান্ড প্রক্রিয়া
          </h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed font-light max-w-3xl">
            রিটার্নকৃত পণ্য আমাদের কাছে পৌঁছানো এবং যাচাই-বাছাইয়ের পর{" "}
            <span className="text-warning font-bold underline decoration-warning/50 underline-offset-4">
              ৩ কার্যদিবসের
            </span>{" "}
            মধ্যে আপনার অর্থ রিফান্ড করা হবে। যে মাধ্যমে পেমেন্ট করেছিলেন সেই মাধ্যমেই রিফান্ড প্রদান করা হবে।
          </p>
        </section>

        {/* Final Contact Footer */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em]">
            যেকোনো তথ্যের জন্য
          </p>
          <a
            href="tel:+8801772065894"
            className="inline-flex items-center gap-4 py-3 px-8 bg-background rounded-full shadow-lg border border-border hover:border-primary transition-colors"
          >
            <FaPhoneAlt className="text-primary" />
            <span className="text-2xl font-black text-foreground tracking-wider">
              +8801772065894
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
