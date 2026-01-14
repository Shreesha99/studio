"use client";

import Image from "next/image";
import { Service } from "./service-item";
import { AnimatePresence, motion } from "framer-motion";

export const ServiceImage = ({ service }: { service: Service }) => {
  return (
    <div className="aspect-[4/3] rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={service.imageUrl}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } }}
          className="w-full h-full"
        >
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
