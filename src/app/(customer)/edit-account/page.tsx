import dynamic from "next/dynamic";

const EditAccountForm = dynamic(() => import("./components/EditAccountForm"), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
      <div className="h-10 bg-muted rounded-lg w-1/3"></div>
      <div className="h-64 bg-muted rounded-xl"></div>
    </div>
  ),
});

export const metadata = {
  title: "অ্যাকাউন্ট সম্পাদনা | TechMela",
};

const EditAccountPage = () => {
  return (
    <div>
      <EditAccountForm />
    </div>
  );
};

export default EditAccountPage;
