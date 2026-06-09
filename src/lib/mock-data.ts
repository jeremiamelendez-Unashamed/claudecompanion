export type InvoiceStatus = "paid" | "sent" | "overdue" | "draft";

export interface Client {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
  totalBilled: number;
  outstanding: number;
}

export interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  amount: number;
  dueDate: string;
  issuedDate: string;
  status: InvoiceStatus;
  lineItems: LineItem[];
  notes?: string;
}

export interface Activity {
  id: string;
  type: "payment" | "sent" | "reminder" | "created";
  message: string;
  timestamp: string;
}

export const currentUser = {
  name: "Jeremia Carter",
  business: "Carter Design Co.",
  email: "jeremia@carterdesign.co",
  initials: "JC",
};

export const dashboardStats = {
  outstanding: 4820,
  paidThisMonth: 6350,
  overdue: 1200,
  avgDaysToPayment: 8,
};

export const revenueByMonth = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 5900 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 7100 },
];

export const clients: Client[] = [
  {
    id: "c1",
    name: "Northwind Studio",
    email: "billing@northwind.studio",
    initials: "NS",
    color: "bg-indigo-500",
    totalBilled: 18400,
    outstanding: 1850,
  },
  {
    id: "c2",
    name: "Apex Labs",
    email: "accounts@apexlabs.io",
    initials: "AL",
    color: "bg-violet-500",
    totalBilled: 22600,
    outstanding: 0,
  },
  {
    id: "c3",
    name: "Harbor & Co.",
    email: "finance@harborco.com",
    initials: "HC",
    color: "bg-sky-500",
    totalBilled: 9800,
    outstanding: 1200,
  },
  {
    id: "c4",
    name: "Meridian Health",
    email: "ap@meridianhealth.org",
    initials: "MH",
    color: "bg-emerald-500",
    totalBilled: 31200,
    outstanding: 950,
  },
  {
    id: "c5",
    name: "Bluefin Media",
    email: "payments@bluefin.media",
    initials: "BM",
    color: "bg-amber-500",
    totalBilled: 14700,
    outstanding: 820,
  },
  {
    id: "c6",
    name: "Stackline",
    email: "hello@stackline.dev",
    initials: "SL",
    color: "bg-rose-500",
    totalBilled: 8900,
    outstanding: 0,
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv1",
    number: "INV-0042",
    clientId: "c1",
    clientName: "Northwind Studio",
    amount: 1850,
    dueDate: "2026-06-12",
    issuedDate: "2026-05-29",
    status: "sent",
    lineItems: [
      { description: "Brand identity refresh", quantity: 1, rate: 1200 },
      { description: "Social media templates", quantity: 8, rate: 81.25 },
    ],
  },
  {
    id: "inv2",
    number: "INV-0041",
    clientId: "c3",
    clientName: "Harbor & Co.",
    amount: 1200,
    dueDate: "2026-05-28",
    issuedDate: "2026-05-14",
    status: "overdue",
    lineItems: [
      { description: "Website redesign — Phase 2", quantity: 1, rate: 1200 },
    ],
  },
  {
    id: "inv3",
    number: "INV-0040",
    clientId: "c4",
    clientName: "Meridian Health",
    amount: 950,
    dueDate: "2026-06-10",
    issuedDate: "2026-05-27",
    status: "sent",
    lineItems: [
      { description: "Patient portal UI audit", quantity: 1, rate: 950 },
    ],
  },
  {
    id: "inv4",
    number: "INV-0039",
    clientId: "c2",
    clientName: "Apex Labs",
    amount: 3200,
    dueDate: "2026-05-20",
    issuedDate: "2026-05-06",
    status: "paid",
    lineItems: [
      { description: "Product launch landing page", quantity: 1, rate: 2200 },
      { description: "Icon set design", quantity: 20, rate: 50 },
    ],
  },
  {
    id: "inv5",
    number: "INV-0038",
    clientId: "c5",
    clientName: "Bluefin Media",
    amount: 820,
    dueDate: "2026-06-14",
    issuedDate: "2026-05-31",
    status: "sent",
    lineItems: [
      { description: "Podcast cover art series", quantity: 4, rate: 205 },
    ],
  },
  {
    id: "inv6",
    number: "INV-0037",
    clientId: "c6",
    clientName: "Stackline",
    amount: 1450,
    dueDate: "2026-05-15",
    issuedDate: "2026-05-01",
    status: "paid",
    lineItems: [
      { description: "Dashboard wireframes", quantity: 1, rate: 950 },
      { description: "Component library setup", quantity: 1, rate: 500 },
    ],
  },
  {
    id: "inv7",
    number: "INV-0036",
    clientId: "c1",
    clientName: "Northwind Studio",
    amount: 2100,
    dueDate: "2026-04-30",
    issuedDate: "2026-04-16",
    status: "paid",
    lineItems: [
      { description: "Annual report design", quantity: 1, rate: 2100 },
    ],
  },
  {
    id: "inv8",
    number: "INV-0035",
    clientId: "c4",
    clientName: "Meridian Health",
    amount: 2800,
    dueDate: "2026-04-22",
    issuedDate: "2026-04-08",
    status: "paid",
    lineItems: [
      { description: "Mobile app onboarding flow", quantity: 1, rate: 2800 },
    ],
  },
  {
    id: "inv9",
    number: "INV-0034",
    clientId: "c2",
    clientName: "Apex Labs",
    amount: 1750,
    dueDate: "2026-04-10",
    issuedDate: "2026-03-27",
    status: "paid",
    lineItems: [
      { description: "SaaS pricing page", quantity: 1, rate: 1750 },
    ],
  },
  {
    id: "inv10",
    number: "INV-0033",
    clientId: "c5",
    clientName: "Bluefin Media",
    amount: 640,
    dueDate: "2026-06-20",
    issuedDate: "2026-06-06",
    status: "draft",
    lineItems: [
      { description: "Newsletter template design", quantity: 1, rate: 640 },
    ],
  },
  {
    id: "inv11",
    number: "INV-0032",
    clientId: "c3",
    clientName: "Harbor & Co.",
    amount: 980,
    dueDate: "2026-03-25",
    issuedDate: "2026-03-11",
    status: "paid",
    lineItems: [
      { description: "E-commerce product photography direction", quantity: 1, rate: 980 },
    ],
  },
  {
    id: "inv12",
    number: "INV-0031",
    clientId: "c6",
    clientName: "Stackline",
    amount: 1100,
    dueDate: "2026-03-18",
    issuedDate: "2026-03-04",
    status: "paid",
    lineItems: [
      { description: "Developer docs site design", quantity: 1, rate: 1100 },
    ],
  },
];

export const dueThisWeek = invoices
  .filter((inv) => inv.status === "sent" || inv.status === "overdue")
  .filter((inv) => {
    const due = new Date(inv.dueDate);
    const now = new Date("2026-06-09");
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return due <= weekEnd;
  })
  .slice(0, 3);

export const recentActivity: Activity[] = [
  {
    id: "a1",
    type: "payment",
    message: "Apex Labs paid INV-0039 ($3,200)",
    timestamp: "2026-06-08T14:32:00",
  },
  {
    id: "a2",
    type: "reminder",
    message: "Reminder sent to Harbor & Co. for INV-0041",
    timestamp: "2026-06-07T09:15:00",
  },
  {
    id: "a3",
    type: "sent",
    message: "INV-0042 sent to Northwind Studio",
    timestamp: "2026-06-06T11:48:00",
  },
  {
    id: "a4",
    type: "created",
    message: "Draft created: INV-0033 for Bluefin Media",
    timestamp: "2026-06-06T10:22:00",
  },
  {
    id: "a5",
    type: "payment",
    message: "Stackline paid INV-0037 ($1,450)",
    timestamp: "2026-06-05T16:05:00",
  },
  {
    id: "a6",
    type: "sent",
    message: "INV-0038 sent to Bluefin Media",
    timestamp: "2026-06-04T08:30:00",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Up to 3 clients, unlimited invoices",
    features: ["Unlimited invoices", "Up to 3 clients", "Basic templates", "Email support"],
    current: false,
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "Unlimited clients, automatic reminders, custom branding",
    features: [
      "Unlimited clients",
      "Automatic reminders",
      "Custom branding",
      "Payment links",
      "Priority support",
    ],
    current: true,
  },
  {
    name: "Studio",
    price: "$29/mo",
    description: "Teams up to 5, client portal, revenue reports",
    features: [
      "Up to 5 team members",
      "Client portal",
      "Revenue reports",
      "API access",
      "Dedicated support",
    ],
    current: false,
  },
];
