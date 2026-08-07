import { CheckCircle } from "lucide-react";

type TThankYouHeaderProps = {
  orderId: string;
  status: string;
};

const ThankYouHeader = ({ orderId, status }: TThankYouHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-warning text-primary-foreground";
      case "confirmed":
        return "bg-success text-primary-foreground";
      case "cancelled":
        return "bg-destructive/100 text-primary-foreground";
      case "delivered":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <div className="text-center mb-6 space-y-3">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/15 mb-1 lg:mb-3 animate-in zoom-in duration-500">
        <CheckCircle className="w-8 h-8 text-success" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-success sm:text-4xl">
        Your order has been placed successfully.
      </h1>
      <p className="text-base text-muted-foreground max-w-2xl mx-auto">
        Thank you for confirming your order! We are processing it and will
        confirm shortly.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
        <span className="whitespace-nowrap text-xl font-bold text-foreground">
          Order #{orderId}
        </span>
        <span
          className={`px-3 py-1 text-sm capitalize whitespace-nowrap rounded-full font-medium ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ThankYouHeader;
