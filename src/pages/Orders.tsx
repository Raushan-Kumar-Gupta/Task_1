
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, ChevronRight, Package, Truck, Check } from "lucide-react";
import AOS from "aos";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  date: string;
  amount: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-5392",
      customer: "Alex Johnson",
      email: "alex@example.com",
      product: "Premium Headphones",
      date: "May 3, 2023",
      amount: 149.99,
      status: "processing",
    },
    {
      id: "ORD-2189",
      customer: "Sarah Williams",
      email: "sarah@example.com",
      product: "Wireless Keyboard",
      date: "May 2, 2023",
      amount: 89.95,
      status: "shipped",
    },
    {
      id: "ORD-7834",
      customer: "Michael Brown",
      email: "michael@example.com",
      product: "Smart Watch",
      date: "May 1, 2023",
      amount: 249.50,
      status: "delivered",
    },
    {
      id: "ORD-4721",
      customer: "Emily Davis",
      email: "emily@example.com",
      product: "Bluetooth Speaker",
      date: "Apr 30, 2023",
      amount: 79.99,
      status: "shipped",
    },
    {
      id: "ORD-9038",
      customer: "David Wilson",
      email: "david@example.com",
      product: "Laptop Stand",
      date: "Apr 29, 2023",
      amount: 34.95,
      status: "delivered",
    },
    {
      id: "ORD-6143",
      customer: "Lisa Martinez",
      email: "lisa@example.com",
      product: "External Hard Drive",
      date: "Apr 28, 2023",
      amount: 129.99,
      status: "cancelled",
    },
  ]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const getStatusBadge = (status: Order["status"]) => {
    const statusStyles = {
      processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      shipped: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    
    const icons = {
      processing: <Package className="h-3.5 w-3.5 mr-1" />,
      shipped: <Truck className="h-3.5 w-3.5 mr-1" />,
      delivered: <Check className="h-3.5 w-3.5 mr-1" />,
      cancelled: <span className="h-3.5 w-3.5 mr-1">×</span>,
    };
    
    return (
      <Badge className={statusStyles[status]} variant="outline">
        <span className="flex items-center">
          {icons[status]}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-aos="fade-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your customer orders
          </p>
        </div>
        <Button className="bg-keshavSoft-pink hover:bg-keshavSoft-pink/90">
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="100">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-blue-500" />
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "processing").length}
            </div>
            <p className="text-muted-foreground text-sm">Orders being processed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Truck className="h-5 w-5 text-amber-500" />
              Shipped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "shipped").length}
            </div>
            <p className="text-muted-foreground text-sm">Orders in transit</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Check className="h-5 w-5 text-green-500" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === "delivered").length}
            </div>
            <p className="text-muted-foreground text-sm">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4" data-aos="fade-up" data-aos-delay="150">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" data-aos="fade-up" data-aos-delay="200">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b py-3 px-4 font-semibold">
                  <div className="col-span-2">Order Details</div>
                  <div className="hidden sm:block">Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-6 items-center border-b py-3 px-4 hover:bg-muted/50 last:border-0"
                  >
                    <div className="col-span-2">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.product}</p>
                    </div>
                    <div className="hidden sm:block text-sm">{order.date}</div>
                    <div className="text-sm font-medium">
                      ${order.amount.toFixed(2)}
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        <span>Details</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.filter(o => o.status === "processing").length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 border-b py-3 px-4 font-semibold">
                    <div className="col-span-2">Order Details</div>
                    <div className="hidden sm:block">Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  
                  {orders
                    .filter(o => o.status === "processing")
                    .map((order) => (
                      <div
                        key={order.id}
                        className="grid grid-cols-6 items-center border-b py-3 px-4 hover:bg-muted/50 last:border-0"
                      >
                        <div className="col-span-2">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.product}</p>
                        </div>
                        <div className="hidden sm:block text-sm">{order.date}</div>
                        <div className="text-sm font-medium">
                          ${order.amount.toFixed(2)}
                        </div>
                        <div>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            <span>Details</span>
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No processing orders found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped">
          <Card>
            <CardHeader>
              <CardTitle>Shipped Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Similar content structure as the "processing" tab */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select the "All" tab to see orders with "Shipped" status</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Similar content structure as the "processing" tab */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">Select the "All" tab to see orders with "Delivered" status</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
