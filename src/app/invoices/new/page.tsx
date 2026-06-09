import { PageHeader } from "@/components/layout/page-header";
import { NewInvoiceForm } from "@/components/invoices/new-invoice-form";

export default function NewInvoicePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New Invoice"
        description="Create and preview your invoice before sending."
      />

      <NewInvoiceForm />
    </div>
  );
}
