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
    <div className="min-h-screen bg-muted/30">
      {/* Premium Hero Section */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Custom Brand Image with Overlay */}
        <Image
          src="/images/return_hero_new.webp"
          alt="Return policy"
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
            Return policy
          </h1>
          <div className="h-1.5 w-16 bg-background/30 mx-auto rounded-full mb-3" />
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            Customer satisfaction is our top priority. Our return rules are
            detailed below.
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
            Introduction
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            Dear customer! ShajGhor is committed to excellent service. We want
            you to be happy with your purchase. If you need to return a product,
            this policy explains the correct process.
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
              Return window
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              You must request a return within{" "}
              <span className="text-primary font-bold">24 hours</span> of
              receiving the product. Please be mindful of the deadline.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-5 md:p-6 border border-border shadow-lg shadow-foreground/5">
            <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center text-warning mb-6">
              <FaPhoneAlt size={24} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              How to return
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              Contact customer care promptly with a valid reason and follow our
              guidelines to return a product.
            </p>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Eligibility Card */}
          <section className="bg-success/10/50 rounded-[1.5rem] p-6 md:p-8 border border-success/20 shadow-sm relative overflow-hidden">
            <FaCheckCircle className="absolute -right-6 -bottom-6 text-primary/30/30 text-9xl rotate-12" />
            <h2 className="text-2xl font-bold text-primary mb-8 border-b border-success/20 pb-4">
              When we accept returns:
            </h2>
            <ul className="space-y-4">
              {[
                "Defective product: manufacturing faults in packaging or the product.",
                "Wrong product: a different item was sent than what you ordered.",
                "Damaged product: packaging torn or product damaged during delivery.",
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
              When we do not accept returns:
            </h2>
            <ul className="space-y-4">
              {[
                "Seal or packaging opened, or product used (for hygiene reasons).",
                "Original packaging damaged or missing.",
                "Return requested after the 24-hour window.",
                "Sale items or products purchased under special offers.",
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
            Refund process
          </h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed font-light max-w-3xl">
            After we receive and inspect the returned product, your payment will
            be refunded within{" "}
            <span className="text-warning font-bold underline decoration-warning/50 underline-offset-4">
              3 business days
            </span>
            . Refunds are usually issued to the same payment method you used.
          </p>
        </section>

        {/* Final Contact Footer */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em]">
            For more information
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
