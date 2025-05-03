
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BarChart2, 
  Settings, 
  Users, 
  MessageSquare,
  FileText, 
  Calendar, 
  ShoppingCart, 
  Mail, 
  ChevronLeft,
  Menu,
  Bell
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  className?: string;
  collapsed: boolean;
  toggleSidebar: () => void;
  currentPath: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
}

const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Analytics", icon: BarChart2, path: "/analytics" },
  { 
    title: "Customers", 
    icon: Users, 
    path: "/customers", 
    badge: { text: "New", variant: "secondary" }
  },
  { 
    title: "Chatbot", 
    icon: MessageSquare, 
    path: "/chatbot", 
    badge: { text: "3", variant: "destructive" }
  },
  { title: "Reports", icon: FileText, path: "/reports" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
  { title: "Orders", icon: ShoppingCart, path: "/orders" },
  { 
    title: "Messages", 
    icon: Mail, 
    path: "/messages",
    badge: { text: "5", variant: "default" }
  },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar({ className, collapsed, toggleSidebar, currentPath }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Trigger animations after initial render
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border dark-mode-transition h-screen transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
        isMobile && collapsed ? "hidden" : "",
        className,
        startAnimation ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className={cn("flex h-14 items-center px-4 py-2 border-b border-sidebar-border justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-keshavSoft-pink pulse"></div>
            <span className="font-semibold text-sidebar-foreground">keshavSoft Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("transition-all", collapsed ? "ml-auto" : "")}
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
              >
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-keshavSoft-pink text-[10px] text-white">
                  {notifications}
                </span>
              </Button>
            </div>
            <div className="text-xs text-sidebar-foreground">
              <p className="font-medium">Notifications</p>
              <p className="text-muted-foreground">You have {notifications} unread alerts</p>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  currentPath === item.path && "bg-keshavSoft-pink text-white hover:bg-keshavSoft-pink/90",
                  collapsed && "justify-center px-0",
                  "transition-all duration-200",
                  hoveredItem === item.path && "translate-x-1"
                )}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  {!collapsed && <span>{item.title}</span>}
                </div>
                
                {!collapsed && item.badge && (
                  <Badge variant={item.badge.variant}>
                    {item.badge.text}
                  </Badge>
                )}
                
                {collapsed && item.badge && (
                  <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-keshavSoft-pink" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      {!collapsed && (
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <p className="text-xs font-medium mb-1">Storage usage</p>
            <div className="w-full h-1.5 bg-sidebar-border rounded-full overflow-hidden mb-2">
              <div className="h-full bg-keshavSoft-pink rounded-full" style={{ width: '72%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">72% of 100GB used</p>
          </div>
        </div>
      )}
    </div>
  );
}
