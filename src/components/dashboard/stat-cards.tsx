import { DollarSign, TrendingUp, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const stats = [
  {
    label: "Outstanding",
    value: formatCurrency(dashboardStats.outstanding),
    icon: DollarSign,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Paid this month",
    value: formatCurrency(dashboardStats.paidThisMonth),
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Overdue",
    value: formatCurrency(dashboardStats.overdue),
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    label: "Avg. days to payment",
    value: `${dashboardStats.avgDaysToPayment} days`,
    icon: Clock,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
];

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
