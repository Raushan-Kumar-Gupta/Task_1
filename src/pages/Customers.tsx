
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import AOS from "aos";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
  avatar: string;
  initials: string;
  spent: number;
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Anna Johnson",
    email: "anna.johnson@example.com",
    status: "active",
    lastActive: "Just now",
    avatar: "https://i.pravatar.cc/150?img=1",
    initials: "AJ",
    spent: 1249.99,
  },
  {
    id: "2",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    status: "active",
    lastActive: "5 min ago",
    avatar: "https://i.pravatar.cc/150?img=8",
    initials: "MS",
    spent: 859.50,
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    status: "inactive",
    lastActive: "3 days ago",
    avatar: "https://i.pravatar.cc/150?img=5",
    initials: "EW",
    spent: 432.25,
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    status: "pending",
    lastActive: "1 hour ago",
    avatar: "https://i.pravatar.cc/150?img=12",
    initials: "JR",
    spent: 0,
  },
  {
    id: "5",
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    status: "active",
    lastActive: "30 min ago",
    avatar: "https://i.pravatar.cc/150?img=20",
    initials: "ST",
    spent: 1876.32,
  },
];

export default function Customers() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between" data-aos="fade-up">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Button className="bg-keshavSoft-pink hover:bg-keshavSoft-pink/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="100">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card data-aos="fade-up" data-aos-delay="200">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 border-b py-3 px-4 font-semibold">
              <div className="col-span-2">Customer</div>
              <div className="hidden sm:block">Status</div>
              <div className="hidden md:block">Last Active</div>
              <div className="text-right">Total Spent</div>
              <div className="text-right">Actions</div>
            </div>
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-6 items-center border-b py-3 px-4 hover:bg-muted/50"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{customer.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Badge className={getStatusColor(customer.status)} variant="outline">
                    {customer.status}
                  </Badge>
                </div>
                <div className="hidden md:block text-sm">{customer.lastActive}</div>
                <div className="text-right font-medium">
                  ${customer.spent.toFixed(2)}
                </div>
                <div className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
