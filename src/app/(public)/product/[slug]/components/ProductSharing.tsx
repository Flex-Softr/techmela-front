"use client";
import EcButton from "@/components/shared/EcButton/EcButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaRegCopy, FaShareAlt, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ProductSharing = () => {
  const [productUrl, setProductUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    const linkInput = linkInputRef?.current;
    if (!linkInput) return;

    try {
      await navigator.clipboard.writeText(productUrl);
      toast({
        title: "Link copied to clipboard!",
        className: "bg-success text-primary-foreground border-none",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const socialMedias = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-primary" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    },
    {
      name: "X",
      icon: <FaXTwitter className="text-foreground" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-success" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(productUrl)}`,
    },
  ];

  if (!productUrl) return null;

  return (
    <div className="flex gap-3 items-center py-3">
      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <FaShareAlt className="text-primary" /> Share:
      </span>

      <div className="flex items-center gap-3">
        {socialMedias.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl transition-transform hover:scale-110 active:scale-95"
            title={`Share on ${social.name}`}
          >
            {social.icon}
          </a>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <button
              className="text-xl text-muted-foreground hover:text-primary transition-colors p-1"
              title="More sharing options"
            >
              <FaRegCopy />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                Share this Product
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6 py-4">
              <div className="flex justify-center gap-6">
                {socialMedias.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <span className="text-4xl">{social.icon}</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              <div className="relative group">
                <div className="flex items-center gap-2 bg-muted p-1 rounded-lg border border-border transition-colors group-hover:border-primary">
                  <Input
                    readOnly
                    value={productUrl}
                    ref={linkInputRef}
                    className="border-none bg-transparent focus-visible:ring-0 text-sm h-9"
                  />
                  <EcButton className="h-8 px-4" onClick={handleCopy}>
                    Copy
                  </EcButton>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductSharing;
