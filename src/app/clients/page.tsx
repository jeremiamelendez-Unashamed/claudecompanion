import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { clients } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Clients"
        description="Your client roster and outstanding balances."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card
            key={client.id}
            className="border-0 shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white ${client.color}`}
                >
                  {client.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{client.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {client.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total billed</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(client.totalBilled)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Outstanding</p>
                  <p
                    className={`text-lg font-semibold ${
                      client.outstanding > 0
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {client.outstanding > 0
                      ? formatCurrency(client.outstanding)
                      : "Paid up"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
