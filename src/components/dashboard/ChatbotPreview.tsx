
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export function ChatbotPreview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newUserMessage]);
      setInput("");
      
      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponses = [
          "I'd be happy to help you with that!",
          "Let me check that information for you.",
          "That's a great question. Here's what I found...",
          "I'll need a bit more information to assist you properly.",
          "I'm analyzing your request and will respond shortly.",
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const newBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: randomResponse,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, newBotMessage]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Card 
      className="flex flex-col h-full"
      data-aos="fade-up" 
      data-aos-duration="700"
      data-aos-delay="200"
    >
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-full",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    {message.role === "bot" ? (
                      <AvatarImage src="/placeholder.svg" />
                    ) : null}
                    <AvatarFallback>
                      {message.role === "bot" ? "AI" : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-lovable-pink text-white"
                        : "bg-muted"
                    )}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
