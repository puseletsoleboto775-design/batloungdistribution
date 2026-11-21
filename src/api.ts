const BASE = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/$/, "");

// Demo mode runs the whole app in the browser with the sample data below, with no backend or
// database. It is on automatically for a production build that has no VITE_API_URL (for example
// a plain Netlify deploy). Set VITE_DEMO=false to turn it off, or VITE_DEMO=true to force it on.
export const DEMO_MODE =
  import.meta.env.VITE_DEMO === "true" ||
  (import.meta.env.PROD && !BASE && import.meta.env.VITE_DEMO !== "false");

export type PackagingSize = "SMALL" | "MEDIUM" | "LARGE";
export const SIZES: PackagingSize[] = ["SMALL", "MEDIUM", "LARGE"];
export type PaymentStatus = "PAID" | "PARTIALLY_PAID" | "UNPAID";
export type PaymentMethod = "CASH" | "MOBILE_MONEY" | "CREDIT";

export const PROVINCES = [
  "Gauteng",
  "Free State",
  "KwaZulu-Natal",
  "Western Cape",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
];

export interface Supplier {
  supplier_id: number;
  business_name: string;
  contact_person: string;
  phone: string;
  province: string;
  address: string;
}
export interface Vendor {
  vendor_id: number;
  vendor_name: string;
  phone_number: string;
  location: string;
  registration_date: string;
  outstanding_balance: number;
  boxes_purchased: number;
}
export interface Fruit {
  fruit_id: number;
  fruit_name: string;
  description: string | null;
  status: "ACTIVE" | "INACTIVE";
}
export interface StockRow {
  fruit_id: number;
  fruit_name: string;
  packaging_size: PackagingSize;
  available_quantity: number;
}
export interface SaleItem {
  fruit_id: number;
  fruit_name: string;
  packaging_size: PackagingSize;
  quantity: number;
  unit_price: number;
}
export interface Sale {
  sale_id: number;
  vendor_id: number;
  vendor_name: string;
  sale_date: string;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  amount_paid: number;
  total_amount: number;
  outstanding_balance: number;
  items: SaleItem[];
}
export interface PurchaseItem {
  fruit_id: number;
  fruit_name: string;
  packaging_size: PackagingSize;
  quantity: number;
  unit_cost: number;
}
export interface Purchase {
  purchase_id: number;
  supplier_id: number;
  supplier_name: string;
  purchase_date: string;
  total_amount: number;
  items: PurchaseItem[];
}
export interface LowStock {
  threshold: number;
  rows: StockRow[];
}
export interface Report {
  topFruits: { fruit_name: string; boxes_sold: number }[];
  revenue: { total_revenue: number };
  topVendor: { vendor_name: string; boxes_purchased: number } | null;
}
export interface LineInput {
  fruitId: number;
  packagingSize: PackagingSize;
  quantity: number;
  price: number;
}

// --- DEMO DATA (used on Netlify when backend is not reachable) ---
let demoSuppliers: Supplier[] = [
  { supplier_id: 1, business_name: "Maseru Fresh Farms", contact_person: "Thabo Mokoena", phone: "082 123 4567", province: "Free State", address: "12 Farm Road, Maseru" },
  { supplier_id: 2, business_name: "Lesotho Orchard Co.", contact_person: "Mpho Leboto", phone: "083 987 6543", province: "Gauteng", address: "45 Orchard Lane, Leribe" },
  { supplier_id: 3, business_name: "Highlands Fruit Suppliers", contact_person: "Naledi Khumalo", phone: "081 555 0199", province: "KwaZulu-Natal", address: "8 Hilltop Ave, Berea" },
];
let demoVendors: Vendor[] = [
  { vendor_id: 1, vendor_name: "Puseletso's Fruit Stall", phone_number: "082 111 2222", location: "Maseru Market", registration_date: "2026-01-15", outstanding_balance: 450, boxes_purchased: 120 },
  { vendor_id: 2, vendor_name: "Katleho Fresh Corner", phone_number: "083 333 4444", location: "Maseru Mall", registration_date: "2026-02-10", outstanding_balance: 0, boxes_purchased: 85 },
  { vendor_id: 3, vendor_name: "Tebello Street Vendor", phone_number: "081 777 8888", location: "Kingsway Road", registration_date: "2026-03-05", outstanding_balance: 1200, boxes_purchased: 60 },
];
let demoFruits: Fruit[] = [
  { fruit_id: 1, fruit_name: "Apples", description: "Fresh red apples", status: "ACTIVE" },
  { fruit_id: 2, fruit_name: "Oranges", description: "Sweet navel oranges", status: "ACTIVE" },
  { fruit_id: 3, fruit_name: "Bananas", description: "Ripe bananas", status: "ACTIVE" },
  { fruit_id: 4, fruit_name: "Pears", description: "Green pears", status: "ACTIVE" },
];
let demoStock: StockRow[] = [
  { fruit_id: 1, fruit_name: "Apples", packaging_size: "SMALL", available_quantity: 85 },
  { fruit_id: 1, fruit_name: "Apples", packaging_size: "MEDIUM", available_quantity: 42 },
  { fruit_id: 1, fruit_name: "Apples", packaging_size: "LARGE", available_quantity: 18 },
  { fruit_id: 2, fruit_name: "Oranges", packaging_size: "SMALL", available_quantity: 120 },
  { fruit_id: 2, fruit_name: "Oranges", packaging_size: "MEDIUM", available_quantity: 65 },
  { fruit_id: 2, fruit_name: "Oranges", packaging_size: "LARGE", available_quantity: 8 },
  { fruit_id: 3, fruit_name: "Bananas", packaging_size: "SMALL", available_quantity: 95 },
  { fruit_id: 3, fruit_name: "Bananas", packaging_size: "MEDIUM", available_quantity: 30 },
  { fruit_id: 4, fruit_name: "Pears", packaging_size: "SMALL", available_quantity: 5 },
  { fruit_id: 4, fruit_name: "Pears", packaging_size: "MEDIUM", available_quantity: 12 },
];
let demoSales: Sale[] = [
  { sale_id: 1, vendor_id: 1, vendor_name: "Puseletso's Fruit Stall", sale_date: "2026-11-18", payment_status: "PAID", payment_method: "CASH", amount_paid: 2500, total_amount: 2500, outstanding_balance: 0, items: [{ fruit_id: 1, fruit_name: "Apples", packaging_size: "MEDIUM", quantity: 20, unit_price: 85 }, { fruit_id: 2, fruit_name: "Oranges", packaging_size: "SMALL", quantity: 10, unit_price: 80 }] },
  { sale_id: 2, vendor_id: 2, vendor_name: "Katleho Fresh Corner", sale_date: "2026-11-19", payment_status: "PARTIALLY_PAID", payment_method: "MOBILE_MONEY", amount_paid: 1500, total_amount: 1950, outstanding_balance: 450, items: [{ fruit_id: 2, fruit_name: "Oranges", packaging_size: "MEDIUM", quantity: 15, unit_price: 130 }] },
  { sale_id: 3, vendor_id: 3, vendor_name: "Tebello Street Vendor", sale_date: "2026-11-20", payment_status: "UNPAID", payment_method: "CREDIT", amount_paid: 0, total_amount: 1200, outstanding_balance: 1200, items: [{ fruit_id: 3, fruit_name: "Bananas", packaging_size: "SMALL", quantity: 20, unit_price: 60 }] },
];
let demoPurchases: Purchase[] = [
  { purchase_id: 1, supplier_id: 1, supplier_name: "Maseru Fresh Farms", purchase_date: "2026-11-10", total_amount: 4200, items: [{ fruit_id: 1, fruit_name: "Apples", packaging_size: "MEDIUM", quantity: 50, unit_cost: 60 }, { fruit_id: 2, fruit_name: "Oranges", packaging_size: "SMALL", quantity: 30, unit_cost: 40 }] },
  { purchase_id: 2, supplier_id: 2, supplier_name: "Lesotho Orchard Co.", purchase_date: "2026-11-15", total_amount: 3100, items: [{ fruit_id: 3, fruit_name: "Bananas", packaging_size: "SMALL", quantity: 60, unit_cost: 35 }, { fruit_id: 4, fruit_name: "Pears", packaging_size: "MEDIUM", quantity: 20, unit_cost: 50 }] },
];
const demoReport: Report = {
  topFruits: [{ fruit_name: "Apples", boxes_sold: 120 }, { fruit_name: "Oranges", boxes_sold: 95 }, { fruit_name: "Bananas", boxes_sold: 80 }],
  revenue: { total_revenue: 5650 },
  topVendor: { vendor_name: "Puseletso's Fruit Stall", boxes_purchased: 120 },
};

export type AuthUser = { id: number; username: string; role: "ADMIN" | "SALES" };
const TOKEN_KEY = "batloung_auth_token";
export const authStore = {
  token: () => localStorage.getItem(TOKEN_KEY),
  save: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem("batloung_auth_user"); },
  saveUser: (user: AuthUser) => localStorage.setItem("batloung_auth_user", JSON.stringify(user)),
  user: (): AuthUser | null => { try { return JSON.parse(localStorage.getItem("batloung_auth_user") || "null"); } catch { return null; } },
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
let demoUsers = [
  { id: 1, username: "admin", role: "ADMIN", active: 1, created_at: "2026-01-01 08:00:00" },
  { id: 2, username: "sales", role: "SALES", active: 1, created_at: "2026-01-01 08:00:00" },
];
const demoFail = (message: string): never => {
  throw new Error(message);
};
const demoStockOf = (fruitId: number, size: PackagingSize) =>
  demoStock.find((r) => r.fruit_id === fruitId && r.packaging_size === size);
const demoFruitName = (id: number) => demoFruits.find((f) => f.fruit_id === id)?.fruit_name ?? "Fruit";
const nextId = (rows: number[]) => Math.max(0, ...rows) + 1;

function demoLogin(username: string, password: string) {
  if (!username.trim() || !password) demoFail("Enter your username and password.");
  const role: "ADMIN" | "SALES" = username.trim().toLowerCase() === "sales" ? "SALES" : "ADMIN";
  return { success: true as const, token: "demo-token", user: { id: role === "SALES" ? 2 : 1, username: username.trim(), role } };
}

function demoRecordSale(input: { vendorId: number; paymentStatus: PaymentStatus; paymentMethod: PaymentMethod; amountPaid: number; lines: LineInput[] }) {
  const vendor = demoVendors.find((v) => v.vendor_id === input.vendorId);
  if (!vendor) demoFail("Vendor not found");
  if (input.lines.length === 0) demoFail("Add at least one item");
  for (const l of input.lines) {
    const row = demoStockOf(l.fruitId, l.packagingSize);
    const have = row?.available_quantity ?? 0;
    if (have < l.quantity)
      demoFail(`Insufficient ${l.packagingSize.toLowerCase()} stock for ${demoFruitName(l.fruitId)}; requested ${l.quantity}, available ${have}`);
  }
  let total = 0;
  const items: SaleItem[] = input.lines.map((l) => {
    const row = demoStockOf(l.fruitId, l.packagingSize)!;
    row.available_quantity -= l.quantity;
    total += l.quantity * l.price;
    return { fruit_id: l.fruitId, fruit_name: demoFruitName(l.fruitId), packaging_size: l.packagingSize, quantity: l.quantity, unit_price: l.price };
  });
  const paid = input.paymentStatus === "PAID" ? total : input.paymentStatus === "UNPAID" ? 0 : Math.min(input.amountPaid, total);
  const owing = Math.max(total - paid, 0);
  demoSales.unshift({
    sale_id: nextId(demoSales.map((x) => x.sale_id)), vendor_id: vendor!.vendor_id, vendor_name: vendor!.vendor_name,
    sale_date: today(), payment_status: input.paymentStatus, payment_method: input.paymentMethod,
    amount_paid: paid, total_amount: total, outstanding_balance: owing, items,
  });
  vendor!.outstanding_balance += owing;
  vendor!.boxes_purchased += input.lines.reduce((n, l) => n + l.quantity, 0);
  return { success: true as const, data: {} };
}

function demoRecordPurchase(input: { supplierId: number; lines: LineInput[] }) {
  const supplier = demoSuppliers.find((s) => s.supplier_id === input.supplierId);
  if (!supplier) demoFail("Supplier not found");
  if (input.lines.length === 0) demoFail("Add at least one item");
  let total = 0;
  const items: PurchaseItem[] = input.lines.map((l) => {
    let row = demoStockOf(l.fruitId, l.packagingSize);
    if (!row) {
      row = { fruit_id: l.fruitId, fruit_name: demoFruitName(l.fruitId), packaging_size: l.packagingSize, available_quantity: 0 };
      demoStock.push(row);
    }
    row.available_quantity += l.quantity;
    total += l.quantity * l.price;
    return { fruit_id: l.fruitId, fruit_name: demoFruitName(l.fruitId), packaging_size: l.packagingSize, quantity: l.quantity, unit_cost: l.price };
  });
  demoPurchases.unshift({
    purchase_id: nextId(demoPurchases.map((x) => x.purchase_id)), supplier_id: supplier!.supplier_id,
    supplier_name: supplier!.business_name, purchase_date: today(), total_amount: total, items,
  });
  return { success: true as const, data: {} };
}

function demoReportFor(from: string, to: string): Report {
  const sales = demoSales.filter((s) => s.sale_date >= from && s.sale_date <= to);
  const byFruit = new Map<string, number>();
  const byVendor = new Map<string, number>();
  for (const s of sales)
    for (const i of s.items) {
      byFruit.set(i.fruit_name, (byFruit.get(i.fruit_name) ?? 0) + i.quantity);
      byVendor.set(s.vendor_name, (byVendor.get(s.vendor_name) ?? 0) + i.quantity);
    }
  const topVendor = [...byVendor.entries()].sort((a, b) => b[1] - a[1])[0];
  return {
    topFruits: [...byFruit.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([fruit_name, boxes_sold]) => ({ fruit_name, boxes_sold })),
    revenue: { total_revenue: sales.reduce((n, s) => n + s.total_amount, 0) },
    topVendor: topVendor ? { vendor_name: topVendor[0], boxes_purchased: topVendor[1] } : null,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T & { success: true }> {
  let response: Response;
  try {
    response = await fetch(`${BASE}/api${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(authStore.token() ? { Authorization: `Bearer ${authStore.token()}` } : {}), ...init?.headers },
    });
  } catch {
    throw new Error("Cannot reach the Batloung Farm API. Is the backend running?");
  }
  let body: { success?: boolean; message?: string } | null = null;
  try {
    body = await response.json();
  } catch {}
  if (!response.ok || !body || body.success === false) {
    throw new Error(body?.message || `The server responded with an error (${response.status})`);
  }
  return body as T & { success: true };
}

const send = (method: string, payload: unknown): RequestInit => ({
  method,
  body: JSON.stringify(payload),
});

// Try real API, fall back to demo data if backend is down
async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (DEMO_MODE) return fallback;
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error && (error.message.includes("log in") || error.message.includes("Administrator access"))) throw error;
    return fallback;
  }
}

export const api = {
  login: async (username: string, password: string) =>
    DEMO_MODE ? demoLogin(username, password) : request<{ token: string; user: AuthUser }>("/auth/login", send("POST", { username, password })),
  users: async () =>
    DEMO_MODE ? [...demoUsers] : (await request<{data: {id:number;username:string;role:string;active:number;created_at:string}[]}>("/auth/users")).data,
  createUser: async (username: string, password: string, role: "ADMIN" | "SALES") => {
    if (!DEMO_MODE) return request("/auth/users", send("POST", {username,password,role}));
    if (username.trim().length < 3 || password.length < 8) demoFail("Username must be at least 3 characters and password at least 8 characters.");
    if (demoUsers.some((u) => u.username === username.trim())) demoFail("That username already exists.");
    demoUsers.push({ id: nextId(demoUsers.map((u) => u.id)), username: username.trim(), role, active: 1, created_at: new Date().toISOString().slice(0, 19).replace("T", " ") });
    return { success: true as const };
  },

  suppliers: () => withFallback(async () => (await request<{ data: Supplier[] }>("/suppliers")).data, [...demoSuppliers]),
  vendors: () => withFallback(async () => (await request<{ data: Vendor[] }>("/vendors")).data, [...demoVendors]),
  fruits: () => withFallback(async () => (await request<{ data: Fruit[] }>("/fruits")).data, [...demoFruits]),
  stock: () => withFallback(async () => (await request<{ data: StockRow[] }>("/fruits/stock")).data, [...demoStock]),
  lowStock: async (): Promise<LowStock> => {
    return withFallback(async () => {
      const body = await request<{ threshold: number; data: StockRow[] }>("/fruits/low-stock");
      return { threshold: body.threshold, rows: body.data };
    }, { threshold: 10, rows: demoStock.filter(r => r.available_quantity <= 10) });
  },
  sales: () => withFallback(async () => (await request<{ data: Sale[] }>("/sales")).data, [...demoSales]),
  purchases: () => withFallback(async () => (await request<{ data: Purchase[] }>("/purchases")).data, [...demoPurchases]),
  report: (_from: string, _to: string) =>
    DEMO_MODE
      ? Promise.resolve(demoReportFor(_from, _to))
      : withFallback(async () => (await request<{ data: Report }>(`/reports/summary?from=${encodeURIComponent(_from)}&to=${encodeURIComponent(_to)}`)).data, demoReport),

  createSupplier: async (input: { businessName: string; contactPerson: string; phone: string; province: string; address: string }) => {
    if (!DEMO_MODE) return request("/suppliers", send("POST", input));
    if (demoSuppliers.some((s) => s.business_name.toLowerCase() === input.businessName.trim().toLowerCase()))
      demoFail("A supplier with that name already exists");
    demoSuppliers.push({ supplier_id: nextId(demoSuppliers.map((s) => s.supplier_id)), business_name: input.businessName.trim(), contact_person: input.contactPerson, phone: input.phone, province: input.province, address: input.address });
    return { success: true as const };
  },
  createVendor: async (input: { vendorName: string; phoneNumber: string; location: string }) => {
    if (!DEMO_MODE) return request("/vendors", send("POST", input));
    if (demoVendors.some((v) => v.vendor_name.toLowerCase() === input.vendorName.trim().toLowerCase()))
      demoFail("A vendor with that name already exists");
    demoVendors.push({ vendor_id: nextId(demoVendors.map((v) => v.vendor_id)), vendor_name: input.vendorName.trim(), phone_number: input.phoneNumber, location: input.location, registration_date: today(), outstanding_balance: 0, boxes_purchased: 0 });
    return { success: true as const };
  },
  deleteVendor: async (vendorId: number) => {
    if (!DEMO_MODE) return request(`/vendors/${vendorId}`, { method: "DELETE" });
    if (demoSales.some((s) => s.vendor_id === vendorId)) demoFail("This vendor has sales records and cannot be deleted.");
    demoVendors = demoVendors.filter((v) => v.vendor_id !== vendorId);
    return { success: true as const };
  },
  createFruit: async (input: { fruitName: string; description?: string }) => {
    if (!DEMO_MODE) return request("/fruits", send("POST", input));
    if (demoFruits.some((f) => f.fruit_name.toLowerCase() === input.fruitName.trim().toLowerCase())) demoFail("That fruit already exists");
    const id = nextId(demoFruits.map((f) => f.fruit_id));
    const name = input.fruitName.trim();
    demoFruits.push({ fruit_id: id, fruit_name: name, description: input.description || null, status: "ACTIVE" });
    for (const size of SIZES) demoStock.push({ fruit_id: id, fruit_name: name, packaging_size: size, available_quantity: 0 });
    return { success: true as const };
  },
  recordSale: async (input: { vendorId: number; paymentStatus: PaymentStatus; paymentMethod: PaymentMethod; amountPaid: number; lines: LineInput[] }) => {
    const payload = { vendorId: input.vendorId, paymentStatus: input.paymentStatus, paymentMethod: input.paymentMethod, amountPaid: input.amountPaid, items: input.lines.map((l) => ({ fruitId: l.fruitId, packagingSize: l.packagingSize, quantity: l.quantity, unitPrice: l.price })) };
    if (DEMO_MODE) return demoRecordSale(input);
    return request("/sales", send("POST", payload));
  },
  recordPurchase: async (input: { supplierId: number; lines: LineInput[] }) => {
    const payload = { supplierId: input.supplierId, items: input.lines.map((l) => ({ fruitId: l.fruitId, packagingSize: l.packagingSize, quantity: l.quantity, unitCost: l.price })) };
    if (DEMO_MODE) return demoRecordPurchase(input);
    return request("/purchases", send("POST", payload));
  },
};