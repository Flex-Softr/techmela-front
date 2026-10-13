export const getStatusDisplay = (status: string) => {
  const normalizedStatus = status?.toLowerCase().trim();

  switch (normalizedStatus) {
    case "pending":
      return {
        label: "অপেক্ষমাণ",
        banglaLabel: "অপেক্ষমাণ",
        className: "bg-warning/10 text-warning border-warning/20",
        color: "hsl(var(--warning))",
      };
    case "confirmed":
      return {
        label: "নিশ্চিত হয়েছে",
        banglaLabel: "নিশ্চিত হয়েছে",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "processing":
      return {
        label: "প্রক্রিয়াধীন",
        banglaLabel: "প্রক্রিয়াধীন",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "warranty processing":
      return {
        label: "ওয়ারেন্টি প্রক্রিয়াধীন",
        banglaLabel: "ওয়ারেন্টি প্রক্রিয়াধীন",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "follow up":
      return {
        label: "ফলো-আপ",
        banglaLabel: "ফলো-আপ",
        className: "bg-warning/10 text-warning border-warning/20",
        color: "hsl(var(--warning))",
      };
    case "processing done":
      return {
        label: "প্রক্রিয়াকরণ সম্পন্ন",
        banglaLabel: "প্রক্রিয়াকরণ সম্পন্ন",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    case "warranty added":
      return {
        label: "ওয়ারেন্টি যুক্ত হয়েছে",
        banglaLabel: "ওয়ারেন্টি যুক্ত হয়েছে",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    case "on courier":
      return {
        label: "কুরিয়ারে পাঠানো হয়েছে",
        banglaLabel: "কুরিয়ারে পাঠানো হয়েছে",
        className: "bg-secondary text-secondary-foreground border-border",
        color: "hsl(var(--secondary-foreground))",
      };
    case "canceled":
    case "cancelled":
      return {
        label: "বাতিল",
        banglaLabel: "বাতিল",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        color: "hsl(var(--destructive))",
      };
    case "returned":
      return {
        label: "রিটার্ন হয়েছে",
        banglaLabel: "রিটার্ন হয়েছে",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        color: "hsl(var(--destructive))",
      };
    case "partial completed":
      return {
        label: "আংশিক সম্পন্ন",
        banglaLabel: "আংশিক সম্পন্ন",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "completed":
    case "delivered":
      return {
        label: "ডেলিভারি সম্পন্ন",
        banglaLabel: "ডেলিভারি সম্পন্ন",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    default:
      return {
        label: status || "অপেক্ষমাণ",
        banglaLabel: status || "অপেক্ষমাণ",
        className: "bg-muted text-muted-foreground border-border",
        color: "hsl(var(--muted-foreground))",
      };
  }
};
