
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, MessageSquare } from "lucide-react";
import AOS from "aos";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: "user" | "contact";
  content: string;
  time: string;
}

export default function Messages() {
  const [activeContact, setActiveContact] = useState<string | null>("c1");
  const [messageText, setMessageText] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "c1",
      name: "John Carter",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "JC",
      lastMessage: "Can you send me the report?",
      time: "12:45 PM",
      unread: 1,
      online: true,
    },
    {
      id: "c2",
      name: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "SS",
      lastMessage: "The meeting has been rescheduled",
      time: "11:30 AM",
      unread: 0,
      online: true,
    },
    {
      id: "c3",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      initials: "AJ",
      lastMessage: "Thanks for your help!",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "c4",
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=10",
      initials: "ED",
      lastMessage: "I'll check and get back to you",
      time: "Yesterday",
      unread: 3,
      online: false,
    },
    {
      id: "c5",
      name: "Michael Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      initials: "MW",
      lastMessage: "Let's schedule a call next week",
      time: "May 2",
      unread: 0,
      online: true,
    },
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    c1: [
      {
        id: "m1",
        sender: "contact",
        content: "Hi there! How are you doing today?",
        time: "12:30 PM",
      },
      {
        id: "m2",
        sender: "user",
        content: "I'm doing well, thanks for asking! How about you?",
        time: "12:32 PM",
      },
      {
        id: "m3",
        sender: "contact",
        content: "I'm good too. Can you send me the report we discussed yesterday?",
        time: "12:45 PM",
      },
    ],
    c2: [
      {
        id: "m1",
        sender: "contact",
        content: "Hello! Just wanted to let you know that the meeting scheduled for tomorrow has been rescheduled to Friday.",
        time: "11:30 AM",
      },
    ],
    c3: [
      {
        id: "m1",
        sender: "contact",
        content: "Thanks for your help with the project!",
        time: "Yesterday",
      },
    ],
    c4: [
      {
        id: "m1",
        sender: "contact",
        content: "Do you have the information I requested?",
        time: "Yesterday",
      },
      {
        id: "m2",
        sender: "contact",
        content: "I need it for the client meeting tomorrow.",
        time: "Yesterday",
      },
      {
        id: "m3",
        sender: "contact",
        content: "Please let me know as soon as possible.",
        time: "Yesterday",
      },
    ],
    c5: [
      {
        id: "m1",
        sender: "contact",
        content: "Let's schedule a call next week to discuss the new project.",
        time: "May 2",
      },
    ],
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const activeContactData = contacts.find(c => c.id === activeContact);
  const activeMessages = activeContact ? messages[activeContact] : [];
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeContact) return;
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: "user",
      content: messageText,
      time: "Just now",
    };
    
    setMessages(prev => ({
      ...prev,
      [activeContact]: [...prev[activeContact], newMessage],
    }));
    
    setMessageText("");
    
    // Mark as read
    setContacts(prev => 
      prev.map(c => 
        c.id === activeContact ? { ...c, unread: 0 } : c
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold tracking-tight mb-6" data-aos="fade-up">Messages</h1>
      
      <div className="grid md:grid-cols-3 gap-6 h-full" data-aos="fade-up" data-aos-delay="100">
        <div className="md:col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            
            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1 px-2 pb-2">
              <div className="space-y-1">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    className={`w-full flex items-center gap-3 p-3 text-sm text-left rounded-md transition-colors
                      ${contact.id === activeContact ? 'bg-muted' : 'hover:bg-muted/50'}`}
                    onClick={() => {
                      setActiveContact(contact.id);
                      // Mark as read when selected
                      setContacts(prev => 
                        prev.map(c => 
                          c.id === contact.id ? { ...c, unread: 0 } : c
                        )
                      );
                    }}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.initials}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{contact.name}</p>
                        <span className="text-xs text-muted-foreground">{contact.time}</span>
                      </div>
                      <p className="truncate text-muted-foreground">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="bg-keshavSoft-pink hover:bg-keshavSoft-pink/90 ml-2 px-2">
                        {contact.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            {activeContactData ? (
              <>
                <CardHeader className="border-b py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                        <AvatarFallback>{activeContactData.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{activeContactData.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {activeContactData.online ? (
                            <span className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                              Online
                            </span>
                          ) : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {activeMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[75%] ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {message.sender === "contact" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                              <AvatarFallback>{activeContactData.initials}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg p-3 text-sm ${
                              message.sender === "user"
                                ? "bg-keshavSoft-pink text-white"
                                : "bg-muted"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {message.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="border-t p-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button size="icon" variant="ghost">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button 
                      className="bg-keshavSoft-pink hover:bg-keshavSoft-pink/90" 
                      onClick={handleSendMessage} 
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="ml-2">Send</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">Select a conversation</h3>
                <p className="text-muted-foreground mt-1 max-w-xs">
                  Choose a contact from the list to start messaging
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
