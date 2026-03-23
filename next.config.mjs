/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sales/ওয়াহাবিদের-ইতিহাস",
        destination: "/sales/wahabider-itihas",
      },
      {
        source:
          "/sales/%E0%A6%93%E0%A7%9F%E0%A6%BE%E0%A6%B9%E0%A6%BE%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%87%E0%A6%A4%E0%A6%BF%E0%A6%B9%E0%A6%BE%E0%A6%B8",
        destination: "/sales/wahabider-itihas",
      },
      {
        source:
          "/sales/বরেণ্য-ইমাম-মনীষীদের-দৃষ্টিতে-মীলাদুন্নবী-ও-মীলাদ-কিয়াম",
        destination: "/sales/miladunnabi-o-milad-kiyam",
      },
      {
        source:
          "/sales/%E0%A6%AC%E0%A6%B0%E0%A7%87%E0%A6%A3%E0%A7%8D%E0%A6%AF-%E0%A6%87%E0%A6%AE%E0%A6%BE%E0%A6%AE-%E0%A6%AE%E0%A6%A8%E0%A7%80%E0%A6%B7%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%A6%E0%A7%83%E0%A6%B7%E0%A7%8D%E0%A6%9F%E0%A6%BF%E0%A6%A4%E0%A7%87-%E0%A6%AE%E0%A7%80%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%A8%E0%A6%AC%E0%A7%80-%E0%A6%93-%E0%A6%AE%E0%A7%80%E0%A6%B2%E0%A6%BE%E0%A6%A6-%E0%A6%95%E0%A6%BF%E0%A7%9F%E0%A6%BE%E0%A6%AE",
        destination: "/sales/miladunnabi-o-milad-kiyam",
      },
      {
        source: "/sales/মাযহাব-ত্যাগের-শেষ-পরিণাম-ইসলাম-ত্যাগ",
        destination: "/sales/mazhab-tyager-shesh-porinam",
      },
      {
        source:
          "/sales/%E0%A6%AE%E0%A6%BE%E0%A6%AF%E0%A6%B9%E0%A6%BE%E0%A6%AC-%E0%A6%A4%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%97%E0%A7%87%E0%A6%B0-%E0%A6%B6%E0%A7%87%E0%A6%B7-%E0%A6%AA%E0%A6%B0%E0%A6%BF%E0%A6%A3%E0%A6%BE%E0%A6%AE-%E0%A6%87%E0%A6%B8%E0%A6%B2%E0%A6%BE%E0%A6%AE-%E0%A6%A4%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%97",
        destination: "/sales/mazhab-tyager-shesh-porinam",
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "siddikiaprokashoni.cloud",
      },
      {
        protocol: "https",
        hostname: "siddikiaprokashoni.cloud",
      },
      {
        protocol: "http",
        hostname: "api.siddikiaprokashoni.cloud",
      },
      {
        protocol: "https",
        hostname: "api.siddikiaprokashoni.cloud",
      },
      {
        protocol: "http",
        hostname: "siddikiaprokashoni.com",
      },
      {
        protocol: "https",
        hostname: "siddikiaprokashoni.com",
      },
      {
        protocol: "http",
        hostname: "api.siddikiaprokashoni.com",
      },
      {
        protocol: "https",
        hostname: "api.siddikiaprokashoni.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
