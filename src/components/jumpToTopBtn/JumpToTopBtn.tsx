"use client"; // Add this line to make it a Client Component
import { ChevronUp } from "lucide-react"; // Import the ChevronUp icon from lucide-react
import { useEffect, useState } from "react";

const JumpToTopBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Function to toggle visibility of the button based on scroll position
  const toggleVisibility = (): void => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
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
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="z-50">
      {/* Sample content to scroll */}

      {/* "Jump to Top" button */}
      {isVisible && (
        <div style={styles.jumpButton} onClick={scrollToTop}>
          <ChevronUp size={24} className="text-primary" />{" "}
          {/* Using the Lucide ChevronUp icon */}
          {/* Up arrow icon, can be replaced with an actual icon */}
        </div>
      )}
    </div>
  );
};

// Simple styles for the button
const styles = {
  jumpButton: {
    position: "fixed" as const,
    bottom: "60px",
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
  },
};

export default JumpToTopBtn;
