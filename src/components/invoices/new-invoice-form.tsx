"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clients, currentUser } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

interface LineItemRow {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export function NewInvoiceForm() {
  const [clientId, setClientId] = useState("");
  const [dueDate, setDueDate] = useState("2026-06-23");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItemRow[]>([
    { id: "1", description: "", quantity: 1, rate: 0 },
  ]);

  const selectedClient = clients.find((c) => c.id === clientId);
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  function addLineItem() {
    setLineItems((prev) => [
      ...prev,
      { id: String(Date.now()), description: "", quantity: 1, rate: 0 },
    ]);
  }

  function removeLineItem(id: string) {
    if (lineItems.length > 1) {
      setLineItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  function updateLineItem(
    id: string,
    field: keyof Omit<LineItemRow, "id">,
    value: string | number
  ) {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Invoice details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Line items</Label>
              {lineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-3 rounded-lg border border-border/60 p-4 sm:grid-cols-12"
                >
                  <div className="sm:col-span-5">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="Rate"
                      value={item.rate || ""}
                      onChange={(e) =>
                        updateLineItem(
                          item.id,
                          "rate",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between sm:col-span-3">
                    <span className="text-sm font-medium">
                      {formatCurrency(item.quantity * item.rate)}
                    </span>
                    {lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(item.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {index === lineItems.length - 1 && (
                    <div className="sm:col-span-12">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addLineItem}
                        className="mt-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add line item
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Payment terms, thank-you note, or project details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button>Send invoice</Button>
              <Button variant="outline">Save as draft</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="sticky top-8 border-0 shadow-sm">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-base">Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold text-indigo-600">Billora</p>
                <p className="text-sm font-medium">{currentUser.business}</p>
                <p className="text-xs text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">INV-0043</p>
                <p className="text-xs text-muted-foreground">
                  Due {dueDate ? formatDate(dueDate) : "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Bill to
              </p>
              <p className="mt-1 font-medium">
                {selectedClient?.name ?? "Select a client"}
              </p>
              {selectedClient && (
                <p className="text-sm text-muted-foreground">
                  {selectedClient.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 border-b pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <span className="col-span-6">Description</span>
                <span className="col-span-2 text-right">Qty</span>
                <span className="col-span-2 text-right">Rate</span>
                <span className="col-span-2 text-right">Total</span>
              </div>
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 text-sm"
                >
                  <span className="col-span-6 truncate">
                    {item.description || "—"}
                  </span>
                  <span className="col-span-2 text-right">{item.quantity}</span>
                  <span className="col-span-2 text-right">
                    {formatCurrency(item.rate)}
                  </span>
                  <span className="col-span-2 text-right font-medium">
                    {formatCurrency(item.quantity * item.rate)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t pt-4">
              <span className="font-medium">Total</span>
              <span className="text-lg font-semibold">
                {formatCurrency(subtotal)}
              </span>
            </div>

            {notes && (
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs font-medium text-muted-foreground">Notes</p>
                <p className="mt-1 text-sm">{notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
