const Conditions = () => {
  return (
    <div className="mb-8 w-full">
      <div className="bg-primary/10/50 border border-primary/20 rounded-xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span className="bg-primary/10 p-1.5 rounded-full">📝</span>
          শর্তাবলী
        </h3>
        <p className="mb-4 text-sm md:text-base font-medium text-foreground">
          নিচের শর্ত গুলোর সাপেক্ষে ওয়ারেন্টি দাবি করা যাবেঃ
        </p>
        <ul className="space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside ml-2">
          <li>
            পণ্য ক্রয়ের তারিখ ও ক্রেতার নাম, মোবাইল নম্বর, ঠিকানা সঠিকভাবে
            প্রদান করা আবশ্যক।
          </li>
          <li>সঠিক পণ্য আইডি প্রদান করতে হবে।</li>
          <li>সমস্যার বর্ণনা প্রদান করা আবশ্যক।</li>
          <li>পণ্যের কোনো অধিকার সরিয়ে নেওয়া বা পরিবর্তন করা অনুমোদিত নয়।</li>
          <li>ওয়ারেন্টি সার্ভিস এর জন্য নির্দিষ্ট সময়সীমা প্রদান করা হবে।</li>
          <li>
            সকল অ্যাক্সেসরিজ, ডকুমেন্টেশন এবং প্যাকেজিং সম্পূর্ণ ও সঠিকভাবে
            সাবধানে সংরক্ষিত থাকতে হবে।
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Conditions;
