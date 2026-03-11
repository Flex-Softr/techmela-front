export const getStatusDisplay = (status: string) => {
  const normalizedStatus = status?.toLowerCase().trim();

  switch (normalizedStatus) {
    case "pending":
      return {
        label: "Pending",
        banglaLabel: "পেন্ডিং",
        className: "bg-amber-50 text-amber-600 border-amber-100",
        color: "#d97706", // amber-600
      };
    case "confirmed":
      return {
        label: "Confirmed",
        banglaLabel: "কনফার্মড",
        className: "bg-blue-50 text-blue-600 border-blue-100",
        color: "#2563eb", // blue-600
      };
    case "processing":
      return {
        label: "Processing",
        banglaLabel: "প্রসেসিং",
        className: "bg-blue-50 text-blue-600 border-blue-100",
        color: "#2563eb", // blue-600
      };
    case "warranty processing":
      return {
        label: "Warranty Processing",
        banglaLabel: "ওয়ারেন্টি প্রসেসিং",
        className: "bg-blue-50 text-blue-600 border-blue-100",
        color: "#2563eb", // blue-600
      };
    case "follow up":
      return {
        label: "Follow Up",
        banglaLabel: "ফলো আপ",
        className: "bg-amber-50 text-amber-600 border-amber-100",
        color: "#d97706", // amber-600
      };
    case "processing done":
      return {
        label: "Processing Done",
        banglaLabel: "প্রসেসিং সম্পন্ন",
        className: "bg-emerald-50 text-emerald-600 border-emerald-100",
        color: "#059669", // emerald-600
      };
    case "warranty added":
      return {
        label: "Warranty Added",
        banglaLabel: "ওয়ারেন্টি যুক্ত করা হয়েছে",
        className: "bg-emerald-50 text-emerald-600 border-emerald-100",
        color: "#059669", // emerald-600
      };
    case "on courier":
      return {
        label: "On Courier",
        banglaLabel: "কুরিয়ারে আছে",
        className: "bg-purple-50 text-purple-600 border-purple-100",
        color: "#9333ea", // purple-600
      };
    case "canceled":
    case "cancelled":
      return {
        label: "Cancelled",
        banglaLabel: "বাতিল করা হয়েছে",
        className: "bg-red-50 text-red-600 border-red-100",
        color: "#dc2626", // red-600
      };
    case "returned":
      return {
        label: "Returned",
        banglaLabel: "রিটার্ন করা হয়েছে",
        className: "bg-red-50 text-red-600 border-red-100",
        color: "#dc2626", // red-600
      };
    case "partial completed":
      return {
        label: "Partial Completed",
        banglaLabel: "আংশিক সম্পন্ন",
        className: "bg-blue-50 text-blue-600 border-blue-100",
        color: "#2563eb", // blue-600
      };
    case "completed":
    case "delivered":
      return {
        label: "Completed",
        banglaLabel: "সম্পন্ন",
        className: "bg-emerald-50 text-emerald-600 border-emerald-100",
        color: "#059669", // emerald-600
      };
    default:
      return {
        label: status
          ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
          : "N/A",
        banglaLabel: status || "N/A",
        className: "bg-gray-50 text-gray-600 border-gray-100",
        color: "#4b5563", // gray-600
      };
  }
};
