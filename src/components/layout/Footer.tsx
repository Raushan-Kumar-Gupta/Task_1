
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background p-4 text-sm text-muted-foreground dark-mode-transition">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} keshavSoft Admin. All rights reserved.</p>
        <div className="mt-2 md:mt-0 flex items-center gap-1">
          <span>Made with</span>
          <Heart size={16} className="text-keshavSoft-pink fill-keshavSoft-pink" />
          <span>by keshavSoft</span>
        </div>
      </div>
    </footer>
  );
}
