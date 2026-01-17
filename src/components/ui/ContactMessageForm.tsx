"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

export function ContactMessageForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const form = e.currentTarget;
    const payload = {
      name: form.name.valueOf,
      email: form.email.value,
      location: form.location.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();

      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input name="name" placeholder="Full Name / Organization" required />
      <Input
        name="email"
        type="email"
        placeholder="Official Email Address"
        required
      />
      <Input name="location" placeholder="Project Location (optional)" />
      <Textarea
        name="message"
        rows={5}
        placeholder="Briefly describe your project scope or enquiry"
        required
      />

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className={cn(
          "w-full transition-all duration-300",
          status === "success" && "bg-green-600 hover:bg-green-600 text-white",
          status === "error" && "bg-destructive hover:bg-destructive text-white"
        )}
      >
        {status === "idle" && "Send Enquiry"}
        {status === "sending" && "Sending…"}
        {status === "success" && "Enquiry Sent ✓"}
        {status === "error" && "Request Failed – Try Again"}
      </Button>
    </form>
  );
}
