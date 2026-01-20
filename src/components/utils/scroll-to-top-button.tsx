"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed z-50 bottom-6 right-6",
        "h-11 w-11 rounded-full",
        "bg-primary text-primary-foreground",
        "shadow-lg shadow-black/20",
        "flex items-center justify-center",
        "transition-opacity duration-300 hover:opacity-90"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
