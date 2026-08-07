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
    .required("Please enter your name")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can be at most 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email")
    .max(100, "Email can be at most 100 characters"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can be at most 15 digits"),
  subject: yup
    .string()
    .required("Please enter a subject")
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject can be at most 200 characters"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message can be at most 2000 characters"),
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
        title: "Success",
        description:
          "Your message has been sent successfully. We will contact you soon.",
      });

      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Sorry, we couldn't send your message. Please try again.",
      });
    }
  };

  return (
    <div className="bg-background p-6 md:p-10 rounded-3xl shadow-sm border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Send us a message
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Name *
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Your name"
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
              Phone number *
            </label>
            <input
              {...register("phone")}
              type="text"
              placeholder="Your phone number"
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
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Your email"
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
            Subject *
          </label>
          <input
            {...register("subject")}
            type="text"
            placeholder="Message subject"
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
              Message *
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
            placeholder="Write your message here..."
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
            "Sending..."
          ) : (
            <>
              Send message <FaPaperPlane className="text-sm" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
