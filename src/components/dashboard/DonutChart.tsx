import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "@/components/ThemeProvider";

interface DonutChartProps {
  title: string;
  data: number[];
  labels: string[];
}

export function DonutChart({ title, data, labels }: DonutChartProps) {
  const { theme } = useTheme();
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      type: "donut",
      background: "transparent",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    colors: ["#ff4b91", "#9b87f5", "#fec6a1", "#d3e4fd"],
    labels: labels,
    stroke: {
      width: 2,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: false,
              label: "Total",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              color: "#888ea8",
              formatter: function(w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toLocaleString();
              }
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      markers: {
        size: 12,
        strokeWidth: 0,
        fillColors: undefined,
        offsetX: 0,
        offsetY: 0,
        shape: "circle",
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function(value) {
          return value.toLocaleString();
        }
      }
    },
  });

  useEffect(() => {
    if (theme === "dark") {
      setChartOptions((prev) => ({
        ...prev,
        tooltip: {
          theme: "dark",
          y: {
            formatter: function(value) {
              return value.toLocaleString();
            }
          }
        },
        legend: {
          ...prev.legend,
          labels: {
            colors: "#9ca3af",
          },
        },
        plotOptions: {
          ...prev.plotOptions,
          pie: {
            ...prev.plotOptions?.pie,
            donut: {
              ...prev.plotOptions?.pie?.donut,
              labels: {
                ...prev.plotOptions?.pie?.donut?.labels,
                total: {
                  ...prev.plotOptions?.pie?.donut?.labels?.total,
                  color: "#9ca3af",
                },
              },
            },
          },
        },
      }));
    } else {
      setChartOptions((prev) => ({
        ...prev,
        tooltip: {
          theme: "light",
          y: {
            formatter: function(value) {
              return value.toLocaleString();
            }
          }
        },
        legend: {
          ...prev.legend,
          labels: {
            colors: "#6b7280",
          },
        },
        plotOptions: {
          ...prev.plotOptions,
          pie: {
            ...prev.plotOptions?.pie,
            donut: {
              ...prev.plotOptions?.pie?.donut,
              labels: {
                ...prev.plotOptions?.pie?.donut?.labels,
                total: {
                  ...prev.plotOptions?.pie?.donut?.labels?.total,
                  color: "#888ea8",
                },
              },
            },
          },
        },
      }));
    }
  }, [theme]);

  // Add loading state and animation
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card 
      className={`overflow-hidden transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      data-aos="fade-up" 
      data-aos-duration="700"
      data-aos-delay="200"
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <span className="text-xs bg-keshavSoft-pink/10 text-keshavSoft-pink px-2 py-1 rounded-full">
            Updated
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[350px] flex items-center justify-center">
          <ReactApexChart
            options={chartOptions}
            series={data}
            type="donut"
            height={350}
          />
        </div>
      </CardContent>
    </Card>
  );
}
