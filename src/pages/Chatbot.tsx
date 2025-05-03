
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Smile, ChevronRight } from "lucide-react";
import AOS from "aos";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you with that!",
        "Let me check that information for you.",
        "That's a great question. Here's what I found...",
        "I'll need a bit more information to assist you properly.",
        "I'm analyzing your request and will respond shortly.",
        "Based on your input, I would recommend the following steps...",
        "I've found several resources that might help with your inquiry.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold tracking-tight mb-6">AI Assistant</h1>
      
      <div className="grid md:grid-cols-4 gap-6 h-full">
        <div className="md:col-span-1" data-aos="fade-right">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {["General inquiry", "Product support", "Technical help", "Billing question", "Feature request"].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    <span>{item}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3" data-aos="fade-left">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                    data-aos={message.role === "user" ? "fade-left" : "fade-right"}
                    data-aos-duration="400"
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
                            ? "bg-keshavSoft-pink text-white"
                            : "bg-muted"
                        )}
                      >
                        <p>{message.content}</p>
                        <p className="text-[10px] opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-4 mt-auto">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button size="icon" variant="ghost">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
