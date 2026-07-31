export const getStatusDisplay = (status: string) => {
  const normalizedStatus = status?.toLowerCase().trim();

  switch (normalizedStatus) {
    case "pending":
      return {
        label: "Pending",
        banglaLabel: "পেন্ডিং",
        className: "bg-warning/10 text-warning border-warning/20",
        color: "hsl(var(--warning))",
      };
    case "confirmed":
      return {
        label: "Confirmed",
        banglaLabel: "কনফার্মড",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "processing":
      return {
        label: "Processing",
        banglaLabel: "প্রসেসিং",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "warranty processing":
      return {
        label: "Warranty Processing",
        banglaLabel: "ওয়ারেন্টি প্রসেসিং",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "follow up":
      return {
        label: "Follow Up",
        banglaLabel: "ফলো আপ",
        className: "bg-warning/10 text-warning border-warning/20",
        color: "hsl(var(--warning))",
      };
    case "processing done":
      return {
        label: "Processing Done",
        banglaLabel: "প্রসেসিং সম্পন্ন",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    case "warranty added":
      return {
        label: "Warranty Added",
        banglaLabel: "ওয়ারেন্টি যুক্ত করা হয়েছে",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    case "on courier":
      return {
        label: "On Courier",
        banglaLabel: "কুরিয়ারে আছে",
        className: "bg-secondary text-secondary-foreground border-border",
        color: "hsl(var(--secondary-foreground))",
      };
    case "canceled":
    case "cancelled":
      return {
        label: "Cancelled",
        banglaLabel: "বাতিল করা হয়েছে",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        color: "hsl(var(--destructive))",
      };
    case "returned":
      return {
        label: "Returned",
        banglaLabel: "রিটার্ন করা হয়েছে",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        color: "hsl(var(--destructive))",
      };
    case "partial completed":
      return {
        label: "Partial Completed",
        banglaLabel: "আংশিক সম্পন্ন",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "completed":
    case "delivered":
      return {
        label: "Completed",
        banglaLabel: "সম্পন্ন",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    default:
      return {
        label: status
          ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
          : "N/A",
        banglaLabel: status || "N/A",
        className: "bg-muted text-muted-foreground border-border",
        color: "hsl(var(--muted-foreground))",
      };
  }
};
