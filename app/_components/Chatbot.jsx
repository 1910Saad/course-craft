"use client"

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@ai-sdk/react";
import { X, MessageCircle, Send, Loader2, ArrowDownCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((x) => !x);
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button onClick={toggle} size="icon" className="rounded-full p-2">
              <MessageCircle />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && typeof window !== "undefined" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-[95%] md:w-[400px] lg:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex justify-between items-center pb-3">
                <CardTitle className="text-lg font-bold">
                  Chat with CourseCraft AI
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={toggle} className="px-2 py-0">
                  <X />
                </Button>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {messages.length === 0 && (
                    <div className="flex justify-center items-center h-full text-gray-500">
                      No Messages Yet
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={msg.role === "user" ? "text-right mb-4" : "text-left mb-4"}>
                      <div className={msg.role === "user" ? "inline-block bg-primary text-primary-foreground p-2 rounded-lg" : "inline-block bg-muted p-2 rounded-lg"}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} children={msg.content} components={{
                          code({ inline, children, ...props }) {
                            return inline ? <code className="bg-gray-200 p-2 rounded" {...props} /> : <pre className="bg-gray-200 p-2 rounded"><code>{children}</code></pre>
                          },
                          ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>
                        }} />
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-center items-center gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-primary" />
                      <button className="underline" onClick={stop}>Abort</button>
                    </div>
                  )}

                  {error && (
                    <div className="flex justify-center items-center gap-3">
                      <span>An error occurred.</span>
                      <button className="underline" onClick={reload}>Retry</button>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message…"
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
