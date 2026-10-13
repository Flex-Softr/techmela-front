import * as Yup from "yup";

export const shippingInfo = Yup.object({
  fullName: Yup.string()
    .required("আপনার নাম লিখুন")
    .max(50, "নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারবে।"),
  phoneNumber: Yup.string()
    .required("মোবাইল নম্বর আবশ্যক।")
    .matches(
      /^(?!.*[a-zA-Z])01\d{9}$/,
      "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01xxxxxxxxx)"
    ),
  fullAddress: Yup.string().required("পূর্ণাঙ্গ ঠিকানা লিখুন"),
  email: Yup.string().email("সঠিক ইমেইল অ্যাড্রেস লিখুন").optional().nullable(),
  notes: Yup.string().optional().nullable(),
});
