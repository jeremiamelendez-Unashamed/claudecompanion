"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invoices, type InvoiceStatus } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusVariant: Record<InvoiceStatus, "paid" | "sent" | "overdue" | "draft"> = {
  paid: "paid",
  sent: "sent",
  overdue: "overdue",
  draft: "draft",
};

const filters: { label: string; value: InvoiceStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Sent", value: "sent" },
  { label: "Overdue", value: "overdue" },
  { label: "Draft", value: "draft" },
];

export function InvoiceTable() {
  const [filter, setFilter] = useState<InvoiceStatus | "all">("all");

  const filtered =
    filter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  return (
    <div className="space-y-4">
      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as InvoiceStatus | "all")}
      >
        <TabsList>
          {filters.map((f) => (
            <TabsTrigger key={f.value} value={f.value}>
              {f.label}
              <span className="ml-1.5 text-xs text-muted-foreground">
                (
                {f.value === "all"
                  ? invoices.length
                  : invoices.filter((i) => i.status === f.value).length}
                )
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Invoice
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Client
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Amount
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Due date
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b last:border-0 transition-colors hover:bg-muted/20"
              >
                <td className="px-6 py-4 font-medium">{invoice.number}</td>
                <td className="px-6 py-4">{invoice.clientName}</td>
                <td className="px-6 py-4 font-medium">
                  {formatCurrency(invoice.amount)}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {formatDate(invoice.dueDate)}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariant[invoice.status]}>
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
