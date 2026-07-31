import Image from "next/image";
import {
  FaCheckCircle,
  FaClock,
  FaPhoneAlt,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-muted/30 font-hind-siliguri">
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
            রিটার্ন পলিসি
          </h1>
          <div className="h-1.5 w-16 bg-background/30 mx-auto rounded-full mb-3" />
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            গ্রাহক সন্তুষ্টি আমাদের মূল লক্ষ্য। আমাদের পণ্য ফেরতের নিয়মাবলী
            নিচে বিস্তারিত দেওয়া হলো।
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
            প্রিয় গ্রাহক! ShajGhor গ্রাহকদের সর্বোত্তম সেবা নিশ্চিত করার জন্য
            প্রতিশ্রুতিবদ্ধ। আমরা চাই আপনি আমাদের পণ্য কিনে সন্তুষ্ট হোন। তবে
            কোনো কারণে যদি আপনাকে পণ্য ফেরত দিতে হয়, তাহলে এই নীতিমালা আপনাকে
            সঠিক পদ্ধতি সম্পর্কে জানাবে।
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
              রিটার্নের সময়সীমা
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              পণ্যটি পাওয়ার{" "}
              <span className="text-primary font-bold">২৪ ঘণ্টার</span> মধ্যে
              রিটার্নের জন্য আবেদন করতে হবে। সময়ের ব্যাপারে সচেতন থাকা জরুরি।
            </p>
          </div>

          <div className="bg-background rounded-2xl p-5 md:p-6 border border-border shadow-lg shadow-foreground/5">
            <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center text-warning mb-6">
              <FaPhoneAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              পণ্য ফেরতের পদ্ধতি
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              পণ্য ফেরত দেওয়ার জন্য উপযুক্ত কারণ উল্লেখ করে আমাদের কাস্টমার
              কেয়ারে দ্রুত যোগাযোগ করুন এবং আমাদের গাইডলাইন অনুসরণ করুন।
            </p>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Eligibility Card */}
          <section className="bg-success/10/50 rounded-[1.5rem] p-6 md:p-8 border border-success/20 shadow-sm relative overflow-hidden">
            <FaCheckCircle className="absolute -right-6 -bottom-6 text-primary/30/30 text-9xl rotate-12" />
            <h2 className="text-2xl font-bold text-primary mb-8 border-b border-success/20 pb-4">
              কখন পণ্য ফেরত নেয়া হবে:
            </h2>
            <ul className="space-y-4">
              {[
                "দোষপূর্ণ পণ্য: প্যাকেজিং বা প্রোডাক্টে উৎপাদনগত ত্রুটি থাকলে।",
                "ভুল পণ্য: অর্ডার করা পণ্যের বদলে অন্য পণ্য পাঠানো হলে।",
                "ক্ষতিগ্রস্ত পণ্য: ডেলিভারির সময় প্যাকেট ছিঁড়ে গেলে বা পণ্য নষ্ট হলে।",
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
              কখন ফেরত নেয়া হবে না:
            </h2>
            <ul className="space-y-4">
              {[
                "পণ্যের সিল বা মোড়ক খোলা কিংবা ব্যবহৃত হলে (হাইজিনের কারণে)।",
                "পণ্যের মূল প্যাকেজিং ক্ষতিগ্রস্ত বা হারানো গেলে।",
                "নির্ধারিত ২৪ ঘণ্টা সময় পার হওয়ার পর আবেদন করলে।",
                "সেলের আইটেম বা বিশেষ অফারে কেনা পণ্য।",
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
            টাকা রিফান্ড প্রক্রিয়া
          </h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed font-light max-w-3xl">
            রিটার্ন পণ্যটি আমাদের হাতে পৌঁছানোর পর পরীক্ষা করে{" "}
            <span className="text-warning font-bold underline decoration-warning/50 underline-offset-4">
              ৩ কার্যদিবসের
            </span>{" "}
            মধ্যে আপনার পেমেন্ট ফেরত দেওয়া হবে। রিফান্ডের জন্য আপনি যে পেমেন্ট
            পদ্ধতি ব্যবহার করেছেন, সম্ভবত সেই মাধ্যমেই টাকা ফেরত দেয়া হবে।
          </p>
        </section>

        {/* Final Contact Footer */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em]">
            আরও তথ্যের জন্য
          </p>
          <div className="inline-flex items-center gap-4 py-3 px-8 bg-background rounded-full shadow-lg border border-border">
            <FaPhoneAlt className="text-primary" />
            <span className="text-2xl font-black text-foreground tracking-wider">
              01710020030
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
