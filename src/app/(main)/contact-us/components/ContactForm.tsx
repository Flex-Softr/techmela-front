"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import * as yup from "yup";
import { useSendContactMessageMutation } from "@/redux/features/contactApi/contactApiSlice";
import { useToast } from "@/components/ui/use-toast";

const schema = yup.object().shape({
  name: yup.string().required("আপনার নাম লিখুন"),
  email: yup.string().email("সঠিক ইমেল লিখুন").required("আপনার ইমেল লিখুন"),
  phone: yup.string().required("আপনার ফোন নম্বর লিখুন"),
  subject: yup.string().required("বিষয় লিখুন"),
  message: yup.string().required("আপনার বার্তা লিখুন"),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await sendContactMessage(data).unwrap();

      toast({
        title: "সফল হয়েছে",
        description:
          "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });

      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "ব্যর্থ হয়েছে",
        description:
          "দুঃখিত, বার্তা পাঠানো সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।",
      });
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-hind-siliguri">
        আমাদের মেসেজ দিন
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 font-hind-siliguri"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              নাম *
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="আপনার নাম"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ফোন নম্বর *
            </label>
            <input
              {...register("phone")}
              type="text"
              placeholder="আপনার ফোন নম্বর"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone ? "border-red-500" : "border-gray-200"
              } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ইমেল *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="আপনার ইমেল"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            বিষয় *
          </label>
          <input
            {...register("subject")}
            type="text"
            placeholder="মেসেজের বিষয়"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.subject ? "border-red-500" : "border-gray-200"
            } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            মেসেজ *
          </label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="আপনার বার্তা এখানে লিখুন..."
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.message ? "border-red-500" : "border-gray-200"
            } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
        >
          {isLoading ? (
            "পাঠানো হচ্ছে..."
          ) : (
            <>
              মেসেজ পাঠান <FaPaperPlane className="text-sm" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
