import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dueThisWeek } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusVariant = {
  paid: "paid" as const,
  sent: "sent" as const,
  overdue: "overdue" as const,
  draft: "draft" as const,
};

export function DueThisWeek() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Due this week</CardTitle>
        <p className="text-sm text-muted-foreground">
          {dueThisWeek.length} invoices need attention
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {dueThisWeek.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">{invoice.clientName}</p>
              <p className="text-xs text-muted-foreground">
                {invoice.number} · Due {formatDate(invoice.dueDate)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">
                {formatCurrency(invoice.amount)}
              </span>
              <Badge variant={statusVariant[invoice.status]}>
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
