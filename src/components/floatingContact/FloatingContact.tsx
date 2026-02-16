"use client";

import Image from "next/image";
import { useState } from "react";

const FloatingContact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: "/images/social_icons/whatsapp.png",
      link: "http://wa.me/8801973890872", // Replace with your WhatsApp number
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      name: "Facebook",
      icon: "/images/social_icons/facebook.png",
      link: "https://www.facebook.com/jutarhat21", // Replace with your Facebook page username
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 flex flex-col-reverse items-end gap-3 z-40">
      {/* Main Toggle Button */}
      <button
        onClick={toggleExpand}
        className={`size-[50px] rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50 ${
          isExpanded
            ? "bg-red-500 hover:bg-red-600 rotate-45"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        }`}
        aria-label="Toggle contact options"
      >
        <svg
          className="w-6 h-6 text-white transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isExpanded ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          )}
        </svg>
      </button>

      {/* Contact Options - Appear when expanded */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 z-50 ${
          isExpanded
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {contactOptions.map((option, index) => (
          <a
            key={option.name}
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 ${option.bgColor} ${option.hoverColor} text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 group`}
            style={{
              transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
            }}
          >
            <div className="relative w-6 h-6">
              <Image
                src={option.icon}
                alt={option.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium pr-2">{option.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingContact;
