import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { InvoiceTable } from "@/components/invoices/invoice-table";
import { Button } from "@/components/ui/button";

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Invoices"
        description="Manage and track all your invoices."
        action={
          <Button asChild>
            <Link href="/invoices/new">
              <Plus className="h-4 w-4" />
              New invoice
            </Link>
          </Button>
        }
      />

      <InvoiceTable />
    </div>
  );
}
