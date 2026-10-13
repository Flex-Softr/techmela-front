import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] px-4 text-center">
      <h1 className="text-4xl font-bold text-foreground">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="my-4 text-muted-foreground">
        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।
      </p>
      <Link
        href="/"
        className="text-primary-foreground py-2.5 px-6 bg-primary rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        হোমে ফিরে যান
      </Link>
    </div>
  );
}
