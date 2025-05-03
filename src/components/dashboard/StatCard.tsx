
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-lovable-pink",
  iconBgColor = "bg-lovable-light",
}: StatCardProps) {
  return (
    <Card 
      className="card-stats overflow-hidden" 
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                change.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {change.positive ? "+" : "-"} {change.value}{" "}
              <span className="text-muted-foreground">from last month</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconBgColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </CardContent>
    </Card>
  );
}
