import { Metadata } from "next";
import { notFound } from "next/navigation";

// Import existing page components as content
import MazhabTyagerPage, {
  generateMetadata as mazhabMetadata,
} from "../mazhab-tyager-shesh-porinam/content";
import MiladunnabiPage, {
  generateMetadata as miladMetadata,
} from "../miladunnabi-o-milad-kiyam/content";
import WahabiderItihasPage, {
  generateMetadata as wahabiderMetadata,
} from "../wahabider-itihas/content";

type TProps = {
  params: {
    slug: string;
  };
};

export const revalidate = false; // On-demand revalidation only

export async function generateStaticParams() {
  return [
    { slug: "mazhab-tyager-shesh-porinam" },
    { slug: "miladunnabi-o-milad-kiyam" },
    { slug: "wahabider-itihas" },
  ];
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { slug } = params;

  switch (slug) {
    case "mazhab-tyager-shesh-porinam":
      return mazhabMetadata();
    case "miladunnabi-o-milad-kiyam":
      return miladMetadata();
    case "wahabider-itihas":
      return wahabiderMetadata();
    default:
      return {};
  }
}

const SalesLandingPage = async ({ params }: TProps) => {
  const { slug } = params;

  // Render the specific landing page component based on slug
  switch (slug) {
    case "mazhab-tyager-shesh-porinam":
      return <MazhabTyagerPage />;
    case "miladunnabi-o-milad-kiyam":
      return <MiladunnabiPage />;
    case "wahabider-itihas":
      return <WahabiderItihasPage />;
    default:
      notFound();
  }
};

export default SalesLandingPage;
