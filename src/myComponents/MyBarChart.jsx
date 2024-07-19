import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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


function MyBarChart(props) {
  const chartData = props.data;

  const chartConfig = props.headings.reduce((config, label, index) => {
    const key = label.replace(/ /g, "_").toLowerCase();
    config[key] = {
      label: label,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {});
  // console.log(chartConfig)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Pending Total</CardTitle>
        <CardDescription>Till current day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="package"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {Object.keys(chartConfig).map((item, index) => (
              <Bar
                key={index}
                dataKey={item}
                fill={chartConfig[item].color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}

export default MyBarChart;
