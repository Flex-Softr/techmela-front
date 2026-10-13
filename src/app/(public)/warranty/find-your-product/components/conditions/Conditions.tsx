const Conditions = () => {
  return (
    <div className="mb-8 w-full">
      <div className="bg-primary/10/50 border border-primary/20 rounded-xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span className="bg-primary/10 p-1.5 rounded-full">📝</span>
          ওয়ারেন্টি শর্তাবলী
        </h3>
        <p className="mb-4 text-sm md:text-base font-medium text-foreground">
          ওয়ারেন্টি ক্লেম করার জন্য নিচের নিয়ম ও শর্তাবলী প্রযোজ্য:
        </p>
        <ul className="space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside ml-2">
          <li>
            অর্ডারের তারিখ, ক্রেতার নাম, মোবাইল নম্বর এবং সঠিক ঠিকানা প্রদান করতে হবে।
          </li>
          <li>সঠিক প্রোডাক্ট বা ওয়ারেন্টি কোড উল্লেখ করতে হবে।</li>
          <li>পণ্যের সমস্যা বিস্তারিতভাবে উল্লেখ করতে হবে।</li>
          <li>পণ্যের কোনো স্টিকার, সিরিয়াল নম্বর বা অংশ পরিবর্তন বা নষ্ট করা যাবে না।</li>
          <li>ওয়ারেন্টি সেবা প্রদানের জন্য নির্দিষ্ট সময়সীমা প্রয়োজন হতে পারে।</li>
          <li>
            পণ্যটির সাথে থাকা সমস্ত এক্সেসরিজ, ডকুমেন্ট এবং মূল প্যাকেজিং অক্ষত অবস্থায় সাথে রাখতে হবে।
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Conditions;
