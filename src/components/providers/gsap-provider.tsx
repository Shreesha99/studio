"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PropsWithChildren } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const GsapProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};
