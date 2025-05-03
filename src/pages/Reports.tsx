
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, PieChart, LineChart, FileText } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "@/components/ThemeProvider";
import AOS from "aos";

export default function Reports() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const barChartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    colors: ["#ff4b91", "#6366f1"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: { colors: theme === "dark" ? "#94a3b8" : "#64748b" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: theme === "dark" ? "#94a3b8" : "#64748b" },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: theme === "dark" ? "#f8fafc" : "#0f172a" },
    },
    tooltip: { theme: theme === "dark" ? "dark" : "light" },
  };

  const barChartSeries = [
    {
      name: "Revenue",
      data: [44, 55, 57, 56, 61, 58],
    },
    {
      name: "Profit",
      data: [35, 41, 36, 26, 45, 48],
    },
  ];

  const reportsList = [
    { id: 1, name: "Annual Financial Summary", type: "PDF", date: "May 12, 2023", size: "2.4 MB" },
    { id: 2, name: "Quarterly Sales Analysis", type: "XLSX", date: "Apr 03, 2023", size: "1.8 MB" },
    { id: 3, name: "Customer Acquisition Report", type: "DOCX", date: "Mar 21, 2023", size: "3.1 MB" },
    { id: 4, name: "Product Performance Review", type: "PDF", date: "Feb 14, 2023", size: "4.2 MB" },
    { id: 5, name: "Marketing Campaign Results", type: "PPTX", date: "Jan 28, 2023", size: "5.6 MB" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-aos="fade-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            View and generate reports for your business
          </p>
        </div>
        <Button className="bg-keshavSoft-pink hover:bg-keshavSoft-pink/90">
          <Download className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </div>

      <Tabs defaultValue="charts" className="w-full" data-aos="fade-up" data-aos-delay="100">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Revenue</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Monthly revenue overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactApexChart 
                  options={barChartOptions} 
                  series={barChartSeries} 
                  type="bar" 
                  height={250} 
                />
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="ghost" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Customers</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactApexChart 
                  options={{
                    ...barChartOptions,
                    chart: { type: "pie", height: 250 },
                    labels: ["New", "Returning", "Inactive"],
                    colors: ["#ff4b91", "#6366f1", "#94a3b8"],
                    legend: { position: "bottom" },
                  }}
                  series={[44, 55, 13]} 
                  type="pie" 
                  height={250} 
                />
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="ghost" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Growth</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Year over year growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactApexChart 
                  options={{
                    ...barChartOptions,
                    chart: { type: "line", height: 250 },
                    stroke: { curve: "smooth", width: 3 },
                  }}
                  series={[{
                    name: "Growth",
                    data: [30, 40, 35, 50, 49, 60]
                  }]} 
                  type="line" 
                  height={250} 
                />
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="ghost" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>
                Access and download your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportsList.map((report) => (
                  <div 
                    key={report.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-keshavSoft-light">
                        <FileText className="h-5 w-5 text-keshavSoft-pink" />
                      </div>
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.type} • {report.date} • {report.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
