/* eslint-disable react/no-unescaped-entities */
import {
  FaFacebook,
  FaHeadset,
  FaUsers,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const StoreLocationPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 ">
      {/* Hero Section */}
      {/* Store Info and Map Section */}
      <section className="pt-8 pb-2 md:pt-12 md:pb-4">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Map Section */}
          <div className="lg:w-1/2 relative mb-6 lg:mb-0">
            <div className="bg-white rounded-2xl shadow border border-border/40 overflow-hidden">
              <div className="h-64 sm:h-80 lg:h-96 min-h-[250px] lg:min-h-[425px] relative">
                <iframe
                  className="w-full h-full rounded-t-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9931714529966!2d90.48777747362271!3d23.711937890255083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b70009c04db1%3A0x814b3a09778a03cf!2sSurmela%20bari!5e0!3m2!1sen!2sbd!4v1773033356114!5m2!1sen!2sbd"
                  allowFullScreen
                  loading="lazy"
                  title="Google Map - Siddikia Prokashoni"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="flex-1 p-6 bg-white rounded-lg ">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-2xl md:text-4xl text-gray-700 font-extrabold mb-2 ">
                আমাদের ঠিকানা
              </h2>
              <div className="bg-primary h-1 w-24 rounded mb-3"></div>
              <p className="text-md text-gray-500 md:text-lg text-center mb-2">
                সরাসরি আমাদের প্রকাশনীতে এসে বই সংগ্রহ করতে পারেন।
              </p>
              <p className="text-md md:text-lg text-center text-gray-500 mb-2 italic">
                আমাদের প্রকাশনীর ঠিকানা:
              </p>
              <p className="text-md font-bold text-gray-600 tracking-wide mb-2 text-center max-w-sm">
                সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১
              </p>
              <h3 className="text-md md:text-xl font-semibold text-gray-600 mb-2">
                হেল্পলাইন:
              </h3>
              <a
                href="tel:+8801602431167"
                className="flex items-center justify-center space-x-3 hover:text-primary transition-all duration-300"
              >
                <div className="flex items-center bg-primary text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition">
                  <FaHeadset className="mr-2 mt-1 text-2xl md:text-3xl animate-bounce" />
                  <p className="text-md md:text-xl">০১৬০২-৪৩১১৬৭</p>
                </div>
              </a>

              <h2 className="text-sm md:text-lg font-semibold mt-6 mb-4 text-center">
                সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত হোন
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <a
                  href="https://www.facebook.com/siddikiyaprokashoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-blue-600 hover:text-blue-700 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook title="Facebook Page" />
                </a>
                <a
                  href="http://wa.me/8801602431167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-green-500 hover:text-green-600 transition"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp title="WhatsApp" />
                </a>
                <a
                  href="https://www.facebook.com/groups/548576081614946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-blue-600 hover:text-blue-700 transition"
                  aria-label="Facebook Group"
                >
                  <FaUsers title="Facebook Group" />
                </a>
                <a
                  href="https://youtube.com/@dmkbofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-red-600 hover:text-red-700 transition"
                  aria-label="YouTube"
                >
                  <FaYoutube title="YouTube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
    </div>
  );
};

export default StoreLocationPage;
