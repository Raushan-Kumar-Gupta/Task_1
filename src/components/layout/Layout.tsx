
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useToast } from "@/components/ui/use-toast";

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Show welcome toast on first load
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to keshavSoft Admin",
          description: "Explore the dashboard and analytics features.",
          duration: 5000,
        });
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1000);
    }
  }, [toast]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        className={mobileMenuOpen ? "block absolute z-50" : "hidden md:block"}
        currentPath={location.pathname}
      />
      <div className="flex flex-col w-full">
        <Navbar onMenuClick={toggleMobileMenu} />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-background dark-mode-transition">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
