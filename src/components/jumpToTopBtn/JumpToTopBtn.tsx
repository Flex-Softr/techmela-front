"use client"; // Add this line to make it a Client Component
import { ChevronUp } from "lucide-react"; // Import the ChevronUp icon from lucide-react
import { useEffect, useState } from "react";

const JumpToTopBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  // Function to toggle visibility and bottom position based on scroll
  const handleScroll = (): void => {
    // Visibility
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Bottom position (detected when near the end of the page)
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 120) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="z-50">
      {/* "Jump to Top" button */}
      {isVisible && (
        <div
          style={{
            ...styles.jumpButton,
            bottom: isAtBottom ? "120px" : "80px",
          }}
          onClick={scrollToTop}
          title="উপরে যান"
        >
          <ChevronUp size={24} className="text-primary" />
        </div>
      )}
    </div>
  );
};

// Simple styles for the button
const styles = {
  jumpButton: {
    position: "fixed" as const,
    right: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(4px)",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 900,
    transition: "bottom 0.3s ease-in-out",
  },
};

export default JumpToTopBtn;
