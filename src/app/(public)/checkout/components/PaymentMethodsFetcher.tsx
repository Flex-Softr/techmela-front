import { TPaymentMethod } from "@/types/paymentMethod";
import serverSideFetcher from "@/utilities/serverSideFetcher";
import PaymentMethodsClient from "./PaymentMethods";

const PaymentMethodsFetcher = async ({
  idPrefix = "payment",
}: {
  idPrefix?: string;
}) => {
  const { data: paymentMethods = [] } = await serverSideFetcher<
    TPaymentMethod[]
  >({
    url: "/payment-method?isActive=true",
    tags: ["paymentMethod"],
  });

  return (
    <PaymentMethodsClient paymentMethods={paymentMethods} idPrefix={idPrefix} />
  );
};

export default PaymentMethodsFetcher;
