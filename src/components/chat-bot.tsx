"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Bot, Send, X, User, Loader2, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getSmartReply } from "@/lib/chatbot-engine";

type Message = {
  id: number;
  isUser: boolean;
  text: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const scrollAreaRootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isAtBottomRef = useRef(true);

  /* External open trigger */
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-chatbot", open);
    return () => window.removeEventListener("open-chatbot", open);
  }, []);

  /* Initial greeting */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          isUser: false,
          text: "Hello! I’m the Suprabha Electricals assistant. How can I help you?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  /* Get Radix viewport */
  useEffect(() => {
    if (!scrollAreaRootRef.current) return;

    viewportRef.current = scrollAreaRootRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    );

    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;

      const atBottom = distanceFromBottom < 32;
      isAtBottomRef.current = atBottom;
      setShowScrollDown(!atBottom);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  const scrollToBottom = (smooth = true) => {
    const el = viewportRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });

    setShowScrollDown(false);
    isAtBottomRef.current = true;
  };

  useLayoutEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom(false);
    } else {
      setShowScrollDown(true);
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading && isOpen) inputRef.current?.focus();
  }, [isLoading, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const text = input;

    setMessages((prev) => [...prev, { id: Date.now(), isUser: true, text }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          isUser: false,
          text: getSmartReply(text),
        },
      ]);
      setIsLoading(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm">
      <Card className="h-[70vh] flex flex-col shadow-2xl relative">
        {/* ✅ Close button – absolute top right */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">Suprabha Assistant</h3>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0 relative overflow-hidden">
          <ScrollArea ref={scrollAreaRootRef} className="h-full">
            <div className="p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-2",
                    m.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!m.isUser && <Bot className="h-4 w-4 mt-1" />}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm max-w-[75%]",
                      m.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {m.text}
                  </div>
                  {m.isUser && <User className="h-4 w-4 mt-1" />}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Typing…</span>
                </div>
              )}
            </div>
          </ScrollArea>

          {showScrollDown && (
            <Button
              size="icon"
              onClick={() => scrollToBottom()}
              className="absolute bottom-4 right-4 h-9 w-9 rounded-full shadow-lg"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          )}
        </CardContent>

        {/* Input */}
        <CardFooter className="border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex w-full gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
            />
            <Button size="icon" type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
