"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Bot, Send, X, User, Loader2 } from "lucide-react";
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

  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-chatbot", open);
    return () => window.removeEventListener("open-chatbot", open);
  }, []);

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

  const scrollToBottom = () => {
    if (!viewportRef.current) return;
    viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading && isOpen) inputRef.current?.focus();
  }, [isLoading, isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), isUser: true, text: input },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          isUser: false,
          text: getSmartReply(input),
        },
      ]);
      setIsLoading(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm">
      <Card className="h-[70vh] flex flex-col shadow-2xl">
        <CardHeader className="flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">Suprabha Assistant</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div ref={viewportRef} className="p-4 space-y-4">
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
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          </ScrollArea>
        </CardContent>

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
