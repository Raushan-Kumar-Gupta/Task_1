
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "@/components/ThemeProvider";
import AOS from "aos";

export default function Analytics() {
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
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#ff4b91", "#9b87f5"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      y: {
        formatter: function (val) {
          return "$ " + val.toLocaleString();
        },
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: theme === "dark" ? "#9ca3af" : "#6b7280",
      },
    },
  };

  const barSeries = [
    {
      name: "This Week",
      data: [44, 55, 57, 56, 61, 58, 63],
    },
    {
      name: "Last Week",
      data: [35, 41, 36, 26, 45, 48, 52],
    },
  ];

  const lineChartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#ff4b91", "#9b87f5", "#fec6a1"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 4,
      strokeWidth: 0,
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2023-01-01",
        "2023-02-01",
        "2023-03-01",
        "2023-04-01",
        "2023-05-01",
        "2023-06-01",
        "2023-07-01",
      ],
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      x: {
        format: "MMM dd, yyyy",
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: theme === "dark" ? "#9ca3af" : "#6b7280",
      },
    },
  };

  const lineSeries = [
    {
      name: "Desktop",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Mobile",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
    {
      name: "Tablet",
      data: [8, 9, 10, 12, 10, 9, 8],
    },
  ];

  const heatMapOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "heatmap",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#ff4b91"],
    title: {
      text: "User Activity Heatmap",
      style: {
        color: theme === "dark" ? "#fff" : "#333",
      },
    },
    xaxis: {
      type: "category",
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#9ca3af" : "#6b7280",
        },
      },
    },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
    },
  };

  const heatMapSeries = [
    {
      name: "9:00",
      data: [21, 22, 10, 28, 16, 12, 8],
    },
    {
      name: "12:00",
      data: [58, 42, 36, 19, 45, 15, 10],
    },
    {
      name: "15:00",
      data: [44, 55, 41, 67, 22, 20, 13],
    },
    {
      name: "18:00",
      data: [23, 17, 45, 39, 52, 48, 25],
    },
    {
      name: "21:00",
      data: [17, 7, 25, 13, 55, 41, 57],
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card 
          className="overflow-hidden"
          data-aos="fade-up" 
          data-aos-duration="600"
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactApexChart
              options={barChartOptions}
              series={barSeries}
              type="bar"
              height={350}
            />
          </CardContent>
        </Card>
        <Card 
          className="overflow-hidden"
          data-aos="fade-up" 
          data-aos-duration="600"
          data-aos-delay="100"
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactApexChart
              options={lineChartOptions}
              series={lineSeries}
              type="line"
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      <Card 
        className="overflow-hidden"
        data-aos="fade-up" 
        data-aos-duration="600"
        data-aos-delay="200"
      >
        <CardHeader className="space-y-0 pb-2">
          <CardTitle>User Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactApexChart
            options={heatMapOptions}
            series={heatMapSeries}
            type="heatmap"
            height={350}
          />
        </CardContent>
      </Card>
    </div>
  );
}
