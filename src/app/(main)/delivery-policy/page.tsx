import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Link from "next/link";

const DeliveryPolicyPage = async () => {
  const { data: shippingCharges = [] } = await serverSideFetcher<
    TShippingCharges[]
  >({
    url: "/shipping-charges?isActive=true",
    tags: ["shippingCharge"],
  });

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 mt-14">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        সিদ্দীকিয়া প্রকাশনী ডেলিভারি পলিসি
      </h1>

      <section className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          ডেলিভারি এলাকা:
        </h2>
        <p className="text-gray-600 leading-relaxed">
          সিদ্দীকিয়া প্রকাশনী বর্তমানে সমগ্র বাংলাদেশে হোম ডেলিভারি সেবা প্রদান
          করছে। ঢাকার ভিতরে এবং ঢাকার বাইরে যেকোনো প্রান্তে আমরা আমাদের পণ্য
          পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            ডেলিভারি চার্জ:
          </h2>
          <ul className="space-y-3 text-gray-600">
            {shippingCharges.length > 0 ? (
              shippingCharges.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center rounded-lg border border-gray-100 px-1"
                >
                  <span className="font-medium">{item.name}:</span>
                  <span className="font-bold text-primary text-lg">
                    &#2547; {item.amount}
                  </span>
                </li>
              ))
            ) : (
              <>
                <li className="flex justify-between">
                  <span>ঢাকার ভিতরে:</span>
                  <span className="font-bold">&#2547; ৭০</span>
                </li>
                <li className="flex justify-between">
                  <span>ঢাকার বাইরে:</span>
                  <span className="font-bold">&#2547; ১৩০</span>
                </li>
              </>
            )}
          </ul>
          <p className="mt-4 text-xs text-gray-400 italic">
            * বিশেষ অফার বা প্রমোশনের ক্ষেত্রে ডেলিভারি চার্জ পরিবর্তিত হতে
            পারে।
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            ডেলিভারি সময়সীমা:
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex justify-between">
              <span>ঢাকার ভিতরে:</span>
              <span className="font-medium text-primary">২৪ - ৪৮ ঘণ্টা</span>
            </li>
            <li className="flex justify-between">
              <span>ঢাকার বাইরে:</span>
              <span className="font-medium text-primary">৩ - ৫ কার্যদিবস</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-gray-400 italic">
            * দুর্যোগপূর্ণ আবহাওয়া বা অনিবার্য কারণে ডেলিভারি সময় কিছুটা বেশি
            লাগতে পারে।
          </p>
        </section>
      </div>

      <section className="mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          প্যাকেজিং ও নিরাপত্তা:
        </h2>
        <p className="text-gray-600 leading-relaxed">
          আপনার অর্ডারকৃত পণ্যটি যেন সুরক্ষিত অবস্থায় আপনার কাছে পৌঁছায়, সেজন্য
          আমরা উন্নতমানের প্যাকেজিং নিশ্চিত করি। ডেলিভারি হওয়ার পর পণ্যটি
          ভালোভাবে চেক করে গ্রহণ করার জন্য পরামর্শ দিচ্ছি।
        </p>
      </section>

      <section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
        <h2 className="text-xl font-semibold mb-2 text-primary">
          অর্ডার ট্র্যাকিং:
        </h2>
        <p className="text-gray-700">
          আপনার অর্ডারটি কোথায় আছে তা জানতে আমাদের{" "}
          <Link href="/track-your-order" className="font-bold underline">
            ট্র্যাকিং পেইজ
          </Link>{" "}
          ভিজিট করুন অথবা আমাদের হেল্পলাইনে যোগাযোগ করুন।
        </p>
      </section>

      <div className="mt-12 text-center border-t pt-6">
        <p className="text-gray-500 mb-2">যেকোনো জিজ্ঞাসায় কল করুন:</p>
        <p className="text-2xl font-bold text-primary">01602431167</p>
      </div>
    </div>
  );
};

export default DeliveryPolicyPage;
