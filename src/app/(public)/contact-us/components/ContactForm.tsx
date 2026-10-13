"use client";

import { useToast } from "@/components/ui/use-toast";
import { useSendContactMessageMutation } from "@/redux/features/contactApi/contactApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("আপনার নাম লিখুন")
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(50, "নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে"),
  email: yup
    .string()
    .email("সঠিক ইমেইল ঠিকানা দিন")
    .required("আপনার ইমেইল লিখুন")
    .max(100, "ইমেইল সর্বোচ্চ ১০০ অক্ষরের হতে পারে"),
  phone: yup
    .string()
    .required("আপনার ফোন নম্বর লিখুন")
    .min(10, "সঠিক ফোন নম্বর দিন")
    .max(15, "ফোন নম্বর সর্বোচ্চ ১৫ ডিজিটের হতে পারে"),
  subject: yup
    .string()
    .required("বার্তার বিষয় লিখুন")
    .min(3, "বিষয় কমপক্ষে ৩ অক্ষরের হতে হবে")
    .max(200, "বিষয় সর্বোচ্চ ২০০ অক্ষরের হতে পারে"),
  message: yup
    .string()
    .required("আপনার বার্তাটি লিখুন")
    .min(10, "বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে")
    .max(2000, "বার্তা সর্বোচ্চ ২০০০ অক্ষরের হতে পারে"),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const messageValue = watch("message") || "";

  const onSubmit = async (data: FieldValues) => {
    try {
      await sendContactMessage(data).unwrap();

      toast({
        variant: "success",
        title: "সফল হয়েছে",
        description:
          "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });

      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "ব্যর্থ হয়েছে",
        description: "দুঃখিত, বার্তা পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      });
    }
  };

  return (
    <div className="bg-background p-6 md:p-10 rounded-3xl shadow-sm border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        আমাদের বার্তা পাঠান
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              নাম *
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="আপনার পূর্ণ নাম"
              maxLength={50}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-destructive" : "border-border"
              } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
            />
            {errors.name && (
              <p className="text-destructive text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              ফোন নম্বর *
            </label>
            <input
              {...register("phone")}
              type="text"
              placeholder="০১XXXXXXXXX"
              maxLength={15}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone ? "border-destructive" : "border-border"
              } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
            />
            {errors.phone && (
              <p className="text-destructive text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            ইমেইল *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="আপনার ইমেইল"
            maxLength={100}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-destructive" : "border-border"
            } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            বিষয় *
          </label>
          <input
            {...register("subject")}
            type="text"
            placeholder="বার্তার বিষয়"
            maxLength={200}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.subject ? "border-destructive" : "border-border"
            } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
          />
          {errors.subject && (
            <p className="text-destructive text-xs mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-foreground">
              বার্তা *
            </label>
            <span
              className={`text-xs ${
                messageValue.length > 1800
                  ? "text-destructive"
                  : messageValue.length > 1400
                    ? "text-warning"
                    : "text-muted-foreground"
              }`}
            >
              {messageValue.length}/2000
            </span>
          </div>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="আপনার বার্তাটি বিস্তারিত লিখুন..."
            maxLength={2000}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.message ? "border-destructive" : "border-border"
            } focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none`}
          ></textarea>
          {errors.message && (
            <p className="text-destructive text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
        >
          {isLoading ? (
            "পাঠানো হচ্ছে..."
          ) : (
            <>
              বার্তা পাঠান <FaPaperPlane className="text-sm" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
