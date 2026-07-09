import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Pencil, Trash2, Phone, MapPin, Clock, Package, MessageSquare, User, ImageOff, ChevronDown, Check } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { api } from "../api";
import ProductForm from "./ProductForm";

const STATUS_LABEL = {
  pending: "অপেক্ষমাণ",
  confirmed: "নিশ্চিত",
  delivered: "ডেলিভারি সম্পন্ন",
  cancelled: "বাতিল",
};

const STATUS_COLOR = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function formatDateTime(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  const datePart = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("bn-BD", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return { datePart, timePart };
}

function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api
      .getProducts()
      .then(setProducts)
      .catch(() => setError("পণ্য লোড করা যায়নি"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  // lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = editingProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingProduct]);

  const handleDelete = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত এই পণ্যটি মুছে ফেলতে চান?")) return;
    try {
      await api.deleteProduct(id);
      load();
    } catch (err) {
      alert(err.message || "মুছে ফেলা যায়নি");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <ProductForm
          editingProduct={null}
          onSaved={load}
          onCancel={() => { }}
        />
      </div>

      <div className="lg:col-span-2">
        {loading && <p className="text-sm text-ink/60">লোড হচ্ছে...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-vine-light/20 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-cream">
                {p.image ? (
                  <img
                    src={api.imageUrl(p.image)}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-ink/30">
                    <ImageOff className="h-6 w-6" />
                    <span className="text-xs">কোনো ছবি নেই</span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <p className="truncate text-sm font-bold text-ink">{p.name}</p>
                <p className="truncate text-xs text-ink/60">{p.note}</p>
                <p className="mt-1 text-sm font-extrabold text-vine-dark">৳{p.price}.00</p>
              </div>

              <div className="absolute right-2 top-2 flex gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                <button
                  onClick={() => setEditingProduct(p)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-vine shadow hover:bg-white"
                  aria-label="সম্পাদনা"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-red-500 shadow hover:bg-white"
                  aria-label="মুছুন"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {!loading && products.length === 0 && (
            <p className="col-span-full text-sm text-ink/60">এখনো কোনো পণ্য যোগ করা হয়নি।</p>
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setEditingProduct(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductForm
              editingProduct={editingProduct}
              onSaved={() => {
                setEditingProduct(null);
                load();
              }}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api
      .getOrders()
      .then(setOrders)
      .catch(() => setError("অর্ডার লোড করা যায়নি"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatus = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status);
      load();
    } catch (err) {
      alert(err.message || "স্ট্যাটাস আপডেট করা যায়নি");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত এই অর্ডারটি মুছে ফেলতে চান?")) return;
    try {
      await api.deleteOrder(id);
      load();
    } catch (err) {
      alert(err.message || "মুছে ফেলা যায়নি");
    }
  };

  const statusOptions = Object.entries(STATUS_LABEL).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div>
      {loading && <p className="text-sm text-ink/60">লোড হচ্ছে...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="text-sm text-ink/60">এখনো কোনো অর্ডার আসেনি।</p>
      )}

      <div className="space-y-4">
        {orders.map((o) => {
          const dt = formatDateTime(o.createdAt);
          return (
            <div
              key={o.id}
              className="rounded-2xl border border-vine-light/20 bg-white p-4 shadow-sm sm:p-5"
            >
              {/* Header: order id, date/time, status, actions */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-vine-light/10 pb-3">
                <div>
                  <p className="text-xs font-bold text-vine">অর্ডার #{o.id}</p>
                  {dt && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-ink/50">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {dt.datePart} • {dt.timePart}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[o.status]}`}
                  >
                    {STATUS_LABEL[o.status] || o.status}
                  </span>
                  <Listbox value={o.status} onChange={(value) => handleStatus(o.id, value)}>
                    <div className="relative w-36">
                      <Listbox.Button className="flex w-full items-center justify-between rounded-lg border border-vine-light/30 bg-white px-3 py-2 text-sm outline-none ring-0 shadow-none transition-all duration-200 focus:outline-none focus:ring-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-none" >
                        <span>{STATUS_LABEL[o.status]}</span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl transition duration-200 ease-out origin-top data-[closed]:scale-95 data-[closed]:opacity-0" >
                        {statusOptions.map((item) => (
                          <Listbox.Option
                            key={item.value}
                            value={item.value}
                            className={({ active }) =>
                              `flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors ${active ? "bg-vine text-white" : "text-gray-700"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                {item.label}
                                {selected && <Check className="h-4 w-4" />}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                  <button
                    onClick={() => handleDelete(o.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                    aria-label="মুছুন"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Customer info */}
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-vine">
                    <User className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-ink/40">গ্রাহকের নাম</p>
                    <p className="truncate text-sm font-semibold text-ink">{o.customerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-vine">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-ink/40">ফোন নম্বর</p>

                    <a href={`tel:${o.phone}`}
                      className="truncate text-sm font-semibold text-ink hover:text-vine"
                    >
                      {o.phone}
                    </a>
                  </div>
                </div>

                {o.address && (
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-vine">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] text-ink/40">ঠিকানা</p>
                      <p className="truncate text-sm font-semibold text-ink">{o.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Ordered items */}
              <div className="mt-3 rounded-xl bg-cream/50 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-ink/50">
                  <Package className="h-3.5 w-3.5" /> অর্ডারকৃত পণ্য
                </p>
                <div className="divide-y divide-vine-light/10">
                  {o.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5 text-sm">
                      <span className="text-ink/80">
                        {it.name} <span className="text-ink/40">× {it.qty}</span>
                      </span>
                      <span className="font-medium text-ink">৳{it.price * it.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {o.note && (
                <div className="mt-2 flex items-start gap-1.5 text-xs italic text-ink/60">
                  <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{o.note}</span>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between rounded-xl bg-vine-dark/5 px-3 py-2">
                <span className="text-xs font-semibold text-ink/50">সর্বমোট</span>
                <span className="text-base font-extrabold text-vine-dark">৳{o.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-vine-light/20 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-extrabold text-vine-dark">অ্যাডমিন প্যানেল</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-vine-light/30 px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-cream"
          >
            <LogOut className="h-4 w-4" /> লগআউট
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("orders")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === "orders" ? "bg-vine text-cream" : "bg-white text-ink/70 border border-vine-light/30"
              }`}
          >
            অর্ডারসমূহ
          </button>
          <button
            onClick={() => setTab("products")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === "products" ? "bg-vine text-cream" : "bg-white text-ink/70 border border-vine-light/30"
              }`}
          >
            পণ্য ব্যবস্থাপনা
          </button>
        </div>

        {tab === "orders" ? <OrdersTab /> : <ProductsTab />}
      </main>
    </div>
  );
}
