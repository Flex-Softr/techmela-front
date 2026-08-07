import TShippingCharges from "@/types/shippingCharge";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import Image from "next/image";
import Link from "next/link";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaMapMarkedAlt,
  FaSearchLocation,
  FaTruck,
} from "react-icons/fa";

const DeliveryPolicyPage = async () => {
  const { data: shippingCharges = [] } = await serverSideFetcher<
    TShippingCharges[]
  >({
    url: "/shipping-charges?isActive=true",
    tags: ["shippingCharge"],
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Premium Hero Section */}
      <section className="relative h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden bg-primary">
        <Image
          src="/images/delivery_hero_new.webp"
          alt="Delivery policy"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

        <div className="relative text-center z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-4 tracking-tight">
            Delivery policy
          </h1>
          <div className="h-1.5 w-16 bg-background/30 mx-auto rounded-full mb-4" />
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
            Fast and safe delivery is our promise. Learn more about our shipping
            policy.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 max-w-5xl py-8 md:py-10">
        {/* Intro Card */}
        <section className="bg-background rounded-[1.5rem] p-6 md:p-8 shadow-xl shadow-foreground/5 mb-8 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <FaTruck size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Delivery areas
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            ShajGhor currently offers home delivery across Bangladesh. Inside
            and outside Dhaka, we deliver products safely through trusted
            courier services.
          </p>
        </section>

        {/* Charges and Timelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Shipping Charges Card */}
          <section className="bg-background rounded-2xl p-6 border border-border shadow-lg shadow-foreground/5 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <FaMapMarkedAlt size={22} />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Delivery charges
              </h3>
            </div>
            <ul className="space-y-4">
              {shippingCharges.length > 0
                ? shippingCharges.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border border-border"
                    >
                      <span className="font-medium text-foreground">
                        {item.name}:
                      </span>
                      <span className="font-black text-primary text-xl">
                        &#2547; {item.amount}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-2">
              <FaCheckCircle className="text-primary/40 shrink-0" />
              Delivery charges may change during special offers or promotions.
            </p>
          </section>

          {/* Delivery Timeline Card */}
          <section className="bg-background rounded-2xl p-6 border border-border shadow-lg shadow-foreground/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center text-warning">
                <FaClock size={22} />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Delivery timeline
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border border-border">
                <span className="font-medium text-foreground">
                  Inside Dhaka:
                </span>
                <span className="font-bold text-primary">24 – 48 hours</span>
              </div>
              <div className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border border-border">
                <span className="font-medium text-foreground">
                  Outside Dhaka:
                </span>
                <span className="font-bold text-primary">
                  3 – 5 business days
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground italic flex items-center gap-2">
              <FaCheckCircle className="text-primary/40 shrink-0" />
              Delivery may take longer due to unforeseen circumstances or severe
              weather.
            </p>
          </section>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Packaging Card */}
          <div className="bg-success/10/50 rounded-3xl p-6 border border-success/20 flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-success shrink-0 shadow-sm">
              <FaBoxOpen size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-2">
                Secure packaging
              </h4>
              <p className="text-primary/80 leading-relaxed font-light text-sm">
                We use international-standard packaging so your products arrive
                safe and intact. Every item is packed with bubble wrap in a
                sturdy box.
              </p>
            </div>
          </div>

          {/* Tracking Card */}
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-start gap-5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-sm">
              <FaSearchLocation size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-2">
                Order tracking
              </h4>
              <p className="text-foreground leading-relaxed font-light text-sm mb-3">
                Use our tracking system anytime to check your order status, or
                call our helpline.
              </p>
              <Link
                href="/track-your-order"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                Track order →
              </Link>
            </div>
          </div>
        </div>

        {/* Final Contact CTA */}
        <div className="bg-primary rounded-[1.5rem] p-6 md:p-8 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Contact our helpline for more information
          </h3>
          <div className="inline-flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-md px-8 py-3 rounded-full border border-primary-foreground/20">
            <span className="text-2xl md:text-3xl font-black tracking-widest">
              01710020030
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPolicyPage;
