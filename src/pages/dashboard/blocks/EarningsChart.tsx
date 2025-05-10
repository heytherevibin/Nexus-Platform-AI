"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

// Generate chart data with randomness, trend, and weekly pattern
function generateChartData(
  days: number,
  startDate: string,
  baseUsers: number,
  baseViews: number,
  trend: number = 1.01
): { date: string; activeUsers: number; pageViews: number }[] {
  const data = [];
  let users = baseUsers;
  let views = baseViews;
  for (let i = 0; i < days; i++) {
    // Simulate weekly pattern: higher on weekends
    const dayOfWeek = (i + new Date(startDate).getDay()) % 7;
    const weekendBoost = dayOfWeek === 0 || dayOfWeek === 6 ? 1.15 : 1;
    // Add randomness
    const randomFactor = 0.9 + Math.random() * 0.2;
    users = Math.round(users * trend * weekendBoost * randomFactor);
    views = Math.round(views * trend * weekendBoost * randomFactor * 1.2);
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      activeUsers: users,
      pageViews: views,
    });
    // Reset for next day
    users = Math.max(50, users + Math.round((Math.random() - 0.5) * 10));
    views = Math.max(80, views + Math.round((Math.random() - 0.5) * 20));
  }
  return data;
}

const chartData3m = generateChartData(30, '2023-06-01', 120, 180, 1.01);
const chartData30d = generateChartData(30, '2023-06-01', 100, 150, 1.005);
const chartData7d = generateChartData(7, '2023-06-24', 200, 300, 0.99);

export function EarningsChart() {
  const [range, setRange] = React.useState("3m");
  let chartData = chartData3m;
  if (range === "30d") chartData = chartData30d;
  if (range === "7d") chartData = chartData7d;

  // Use static chart colors, but Card uses theme classes
  const gridColor = "#222";
  const axisColor = "#888";
  const tooltipBg = "#181c20";
  const tooltipText = "#fff";

  return (
    <Card className="bg-white dark:bg-[hsl(230,15%,7.84%)] text-accent-foreground">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>System Metrics</CardTitle>
            <CardDescription>
              {range === "3m" && "System metrics for the last 3 months"}
              {range === "30d" && "System metrics for the last 30 days"}
              {range === "7d" && "System metrics for the last 7 days"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={range === "3m" ? "default" : "outline"}
              size="sm"
              onClick={() => setRange("3m")}
            >
              Last 3 months
            </Button>
            <Button
              variant={range === "30d" ? "default" : "outline"}
              size="sm"
              onClick={() => setRange("30d")}
            >
              Last 30 days
            </Button>
            <Button
              variant={range === "7d" ? "default" : "outline"}
              size="sm"
              onClick={() => setRange("7d")}
            >
              Last 7 days
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke={axisColor} tick={{ fill: axisColor, fontSize: 12 }} />
              <YAxis stroke={gridColor} tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ background: tooltipBg, border: "none", color: tooltipText, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                labelStyle={{ color: tooltipText, fontWeight: 600 }}
                itemStyle={{ color: tooltipText, fontSize: 13 }}
                formatter={(value, name) => {
                  if (name === 'activeUsers') return [value, 'Active Users'];
                  if (name === 'pageViews') return [value, 'Page Views'];
                  return [value, name];
                }}
              />
              <Area type="monotone" dataKey="activeUsers" stroke="#2563eb" fill="url(#colorActiveUsers)" strokeWidth={2.5} dot={false} name="Active Users" />
              <Area type="monotone" dataKey="pageViews" stroke="#22d3ee" fill="url(#colorPageViews)" strokeWidth={2.5} dot={false} name="Page Views" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default EarningsChart;
