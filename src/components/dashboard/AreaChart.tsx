
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "@/components/ThemeProvider";

interface AreaChartProps {
  title: string;
  data: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export function AreaChart({ title, data, categories }: AreaChartProps) {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("Monthly");
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#ff4b91", "#9b87f5"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
        colorStops: [
          [
            {
              offset: 0,
              color: "#ff4b91",
              opacity: 0.2,
            },
            {
              offset: 100,
              color: "#ff4b91",
              opacity: 0,
            },
          ],
          [
            {
              offset: 0,
              color: "#9b87f5",
              opacity: 0.2,
            },
            {
              offset: 100,
              color: "#9b87f5",
              opacity: 0,
            },
          ],
        ],
      },
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
      },
    },
    tooltip: {
      theme: "light",
    },
    grid: {
      borderColor: "#e5e7eb",
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    legend: {
      show: false,
    },
  });

  useEffect(() => {
    if (theme === "dark") {
      setChartOptions((prev) => ({
        ...prev,
        grid: {
          ...prev.grid,
          borderColor: "#374151",
        },
        xaxis: {
          ...prev.xaxis,
          labels: {
            ...prev.xaxis?.labels,
            style: {
              colors: "#9ca3af",
            },
          },
        },
        yaxis: {
          ...prev.yaxis,
          labels: {
            style: {
              colors: "#9ca3af",
            },
          },
        },
        tooltip: {
          theme: "dark",
        },
      }));
    } else {
      setChartOptions((prev) => ({
        ...prev,
        grid: {
          ...prev.grid,
          borderColor: "#e5e7eb",
        },
        xaxis: {
          ...prev.xaxis,
          labels: {
            ...prev.xaxis?.labels,
            style: {
              colors: "#6b7280",
            },
          },
        },
        yaxis: {
          ...prev.yaxis,
          labels: {
            style: {
              colors: "#6b7280",
            },
          },
        },
        tooltip: {
          theme: "light",
        },
      }));
    }
  }, [theme]);

  return (
    <Card 
      className="overflow-hidden"
      data-aos="fade-up" 
      data-aos-duration="700"
      data-aos-delay="100"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 h-8">
              {filter}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("Daily")}>
              Daily
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Weekly")}>
              Weekly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Monthly")}>
              Monthly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Yearly")}>
              Yearly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[350px]">
          <ReactApexChart
            options={chartOptions}
            series={data}
            type="area"
            height="350"
          />
        </div>
      </CardContent>
    </Card>
  );
}
