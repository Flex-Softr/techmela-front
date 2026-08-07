export const getStatusDisplay = (status: string) => {
  const normalizedStatus = status?.toLowerCase().trim();

  switch (normalizedStatus) {
    case "pending":
      return {
        label: "Pending",
        banglaLabel: "Pending",
        className: "bg-warning/10 text-warning border-warning/20",
        color: "hsl(var(--warning))",
      };
    case "confirmed":
      return {
        label: "Confirmed",
        banglaLabel: "Confirmed",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "processing":
      return {
        label: "Processing",
        banglaLabel: "Processing",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "warranty processing":
      return {
        label: "Warranty Processing",
        banglaLabel: "Warranty Processing",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "follow up":
      return {
        label: "Follow Up",
        banglaLabel: "Follow Up",
        className: "bg-warning/10 text-warning border-warning/20",
        color: "hsl(var(--warning))",
      };
    case "processing done":
      return {
        label: "Processing Done",
        banglaLabel: "Processing Done",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    case "warranty added":
      return {
        label: "Warranty Added",
        banglaLabel: "Warranty Added",
        className: "bg-success/10 text-success border-success/20",
        color: "hsl(var(--success))",
      };
    case "on courier":
      return {
        label: "On Courier",
        banglaLabel: "On Courier",
        className: "bg-secondary text-secondary-foreground border-border",
        color: "hsl(var(--secondary-foreground))",
      };
    case "canceled":
    case "cancelled":
      return {
        label: "Cancelled",
        banglaLabel: "Cancelled",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        color: "hsl(var(--destructive))",
      };
    case "returned":
      return {
        label: "Returned",
        banglaLabel: "Returned",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        color: "hsl(var(--destructive))",
      };
    case "partial completed":
      return {
        label: "Partial Completed",
        banglaLabel: "Partial Completed",
        className: "bg-primary/10 text-primary border-primary/20",
        color: "hsl(var(--primary))",
      };
    case "completed":
    case "delivered":
      return {
        label: "Completed",
        banglaLabel: "Completed",
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
