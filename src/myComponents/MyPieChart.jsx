import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";

function MyPieChart(props) {
  const data = props.data;
  // console.log(data)

  const chartData = data.map((item) => ({
    ...item,
    fill: `var(--color-${item.package})`,
  }));
  console.log(chartData)

  const chartConfig1 = chartData.reduce((config, data, index) => {
    config[data.package] = {
      label: data.package.replace(/_/g, " ").toUpperCase(),
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {});

  const chartConfig = {
    title: {
      label: props.title,
    },
    ...chartConfig1,
  };

  console.log(chartConfig)
  const totalPending = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total_pending, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Pending CRFI</CardTitle>
        <CardDescription>Till current day</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total_pending"
              nameKey="package"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPending.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Raised CRFI
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}

export default MyPieChart;
