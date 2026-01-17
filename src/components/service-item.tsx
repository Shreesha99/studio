"use client";

import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type Service = {
  id: number;
  iconName: keyof typeof LucideIcons;
  title: string;
  description: string;
  imageUrl: string;
};

type Props = {
  service: Service;
  onMouseEnter?: () => void;
};

export const ServiceItem = ({ service, onMouseEnter }: Props) => {
  const Icon = LucideIcons[service.iconName] as LucideIcons.LucideIcon;

  return (
    <div
      onMouseEnter={onMouseEnter}
      className={cn(
        "service-item group relative flex cursor-pointer flex-col gap-4 border-b border-border py-8 transition-colors hover:bg-white/5"
      )}
    >
      <div className="container flex items-center gap-6">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          {Icon && <Icon className="h-8 w-8" />}
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-1">
            {service.title}
          </h3>
          <p className="text-muted-foreground max-w-md">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};
