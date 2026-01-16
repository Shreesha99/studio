"use client";

import * as React from "react";
import { Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle power mode"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative h-10 w-10 rounded-full"
      >
        <Zap
          className={cn(
            "h-5 w-5 transition-all duration-300",
            isDark
              ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
              : "text-muted-foreground"
          )}
        />

        {isDark && (
          <span className="absolute inset-0 rounded-full bg-yellow-400/10" />
        )}
      </Button>

      {/* Premium label */}
      <div className="flex flex-col leading-tight select-none">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          Power Mode
        </span>
        <span
          className={cn(
            "text-xs font-medium",
            isDark ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {isDark ? "ON" : "OFF"}
        </span>
      </div>
    </div>
  );
}
