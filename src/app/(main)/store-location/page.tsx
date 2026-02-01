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
    <div className="min-h-screen  bg-gray-100 text-gray-900 ">
      {/* Hero Section */}
      {/* Store Info and Map Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto flex flex-col md:flex-row gap-12">
          {/* Map Section */}
          <div className="md:w-1/2 relative mb-8 md:mb-0">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className=" h-96 min-h-[200px] md:min-h-[425px] relative">
                <iframe
                  className="w-full h-full rounded-t-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.234785862754!2d90.36282847518822!3d23.774652278653882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b00362c719%3A0x98ffa85ad21b509e!2sThrees!5e0!3m2!1sen!2sbd!4v1769081913290!5m2!1sen!2sbd"
                  allowFullScreen
                  loading="lazy"
                  title="Google Map - Khulna"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="flex-1 p-6 bg-white rounded-lg ">
            <div className="flex flex-col justify-center items-center ">
              <h2 className="text-2xl md:text-4xl text-gray-700 font-extrabold mb-2 ">
                Our Store Location
              </h2>
              <div className="bg-gray-300 h-1 w-24 rounded mb-3"></div>
              <p className="text-md text-gray-500 md:text-lg text-center mb-2">
                Explore our products in person at our Khulna location in
                Bangladesh.
              </p>
              <p className="text-md md:text-lg text-center text-gray-500 mb-2 italic">
                We're conveniently located at:
              </p>
              <p className="text-md font-bold text-gray-600 tracking-wide mb-2 text-center max-w-sm">
                শপ নং-৪৭৯/৪২৭,৪২৮,৪২৯ ৪র্থ তলা, শ্যামলী স্কয়ার শপিংমল,
                শ্যামলী,ঢাকা
              </p>
              <h3 className="text-md md:text-xl font-semibold text-gray-600 mb-2">
                Helpline:
              </h3>
              <a
                href="tel:+8801973890872"
                className="flex items-center justify-center space-x-3 hover:text-blue-600 transition-all duration-300"
              >
                <div className="flex items-center bg-primary text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition">
                  <FaHeadset className="mr-2 mt-1 text-2xl md:text-3xl animate-bounce" />
                  <p className="text-md md:text-xl">+8801973890872</p>
                </div>
              </a>

              <h2 className="text-md md:text-xl font-semibold mt-8 mb-4 text-center">
                Follow Us on Social Media
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-4 gap-6 justify-center">
                <a
                  href="https://www.facebook.com/nora?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-blue-600 hover:text-blue-700 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook title="Facebook Page" />
                </a>
                <a
                  href="http://wa.me/8801973890872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-green-500 hover:text-green-600 transition"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp title="WhatsApp" />
                </a>
                <a
                  href="https://www.facebook.com/groups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-4xl text-blue-600 hover:text-blue-700 transition"
                  aria-label="Facebook Group"
                >
                  <FaUsers title="Facebook Group" />
                </a>
                <a
                  href="https://www.youtube.com/@nora"
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
