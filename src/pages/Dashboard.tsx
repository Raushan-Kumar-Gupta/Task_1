
import { useEffect } from "react";
import { BarChart2, ShoppingBag, Users, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ChatbotPreview } from "@/components/dashboard/ChatbotPreview";
import AOS from "aos";
import "aos/dist/aos.css";

const recentActivities = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "JD",
    },
    action: "created a new report",
    time: "2 minutes ago",
  },
  {
    id: "2",
    user: {
      name: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "SS",
    },
    action: "updated the customer database",
    time: "30 minutes ago",
  },
  {
    id: "3",
    user: {
      name: "Robert Johnson",
      avatar: "https://i.pravatar.cc/150?img=8",
      initials: "RJ",
    },
    action: "completed task #342",
    time: "1 hour ago",
  },
  {
    id: "4",
    user: {
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=10",
      initials: "ED",
    },
    action: "started a new project",
    time: "2 hours ago",
  },
];

const salesData = [
  {
    name: "Sales",
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 160, 180],
  },
  {
    name: "Revenue",
    data: [20, 35, 40, 45, 50, 55, 70, 80, 100, 120, 130, 140],
  },
];

const trafficData = [44, 55, 13, 43];
const trafficLabels = ["Direct", "Social", "Referral", "Organic"];

export default function Dashboard() {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change={{ value: "20.1%", positive: true }}
          icon={BarChart2}
          iconColor="text-keshavSoft-pink"
          iconBgColor="bg-keshavSoft-light"
        />
        <StatCard
          title="New Customers"
          value="2,834"
          change={{ value: "8.2%", positive: true }}
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatCard
          title="Sales"
          value="$12,428"
          change={{ value: "1.5%", positive: false }}
          icon={ShoppingBag}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
        <StatCard
          title="Active Users"
          value="573"
          change={{ value: "12.2%", positive: true }}
          icon={ArrowUpRight}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 md:col-span-4">
          <AreaChart
            title="Revenue"
            data={salesData}
            categories={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        </div>
        <div className="col-span-7 md:col-span-3">
          <DonutChart
            title="Traffic Source"
            data={trafficData}
            labels={trafficLabels}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 md:col-span-3">
          <RecentActivity activities={recentActivities} />
        </div>
        <div className="col-span-7 md:col-span-4">
          <ChatbotPreview />
        </div>
      </div>
    </div>
  );
}
