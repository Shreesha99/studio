"use client";

import {
  Clock,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+91 94480 75362",
    icon: Phone,
    href: "tel:+919448075362",
  },
  {
    label: "Email",
    value: "suprabhaele@gmail.com",
    icon: Mail,
    href: "mailto:suprabhaele@gmail.com",
  },
  {
    label: "Working Hours",
    value: "10:00 AM – 6:00 PM (Mon–Sat)",
    icon: Clock,
  },
  {
    label: "Operational Region",
    value: "Karnataka, India",
    icon: MapPin,
  },
];

export function Contact() {
  const container = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  type SubmitState = "idle" | "loading" | "success" | "error";
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState !== "idle") return;

    setSubmitState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setSubmitState("success");
      setForm({ name: "", email: "", location: "", message: "" });

      setTimeout(() => setSubmitState("idle"), 5000);
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={container}
      className="py-28 lg:py-36 bg-card overflow-hidden"
    >
      <div className="container space-y-20">
        {/* Header */}
        <div className="contact-header text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Start a Project Conversation
          </h2>
          <p className="text-lg text-muted-foreground">
            Reach out for government, PSU, and institutional electrical
            projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div className="space-y-10">
            {CONTACT_INFO.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 border-l-2 border-primary/30 pl-6"
                >
                  <Icon className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-medium hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}

            <Alert className="border-destructive/30 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-sm">
                We <strong>do not </strong> provide immediate electrical
                support. This channel is strictly for project-based enquiries
                only.
              </AlertDescription>
            </Alert>
          </div>

          {/* RIGHT – FORM */}
          <Card className="bg-background border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">
                Project Enquiry Form
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  placeholder="Full Name / Organization"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Official Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Project Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
                <Textarea
                  rows={5}
                  placeholder="Describe project scope / tender reference"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitState !== "idle"}
                  className={cn(
                    "w-full font-bold flex items-center justify-center gap-2 transition-all duration-300",
                    submitState === "success" &&
                      "bg-green-600 hover:bg-green-600 text-white",
                    submitState === "error" &&
                      "bg-destructive hover:bg-destructive text-destructive-foreground"
                  )}
                >
                  {submitState === "idle" && (
                    <>
                      Submit Enquiry
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}

                  {submitState === "loading" && (
                    <>
                      Sending
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  )}

                  {submitState === "success" && <>Request Sent ✓</>}

                  {submitState === "error" && <>Request Failed ✕</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
