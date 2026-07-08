import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Pencil, Trash2 } from "lucide-react";
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
          editingProduct={editingProduct}
          onSaved={() => {
            setEditingProduct(null);
            load();
          }}
          onCancel={() => setEditingProduct(null)}
        />
      </div>
      <div className="lg:col-span-2">
        {loading && <p className="text-sm text-ink/60">লোড হচ্ছে...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-vine-light/20 bg-white p-3 shadow-sm"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                {p.image && (
                  <img src={api.imageUrl(p.image)} alt={p.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{p.name}</p>
                <p className="truncate text-xs text-ink/60">{p.note}</p>
                <p className="text-xs font-semibold text-vine-dark">৳{p.price}.00</p>
              </div>
              <button
                onClick={() => setEditingProduct(p)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-vine-light/30 text-vine hover:bg-cream"
                aria-label="সম্পাদনা"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                aria-label="মুছুন"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {!loading && products.length === 0 && (
            <p className="text-sm text-ink/60">এখনো কোনো পণ্য যোগ করা হয়নি।</p>
          )}
        </div>
      </div>
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

  return (
    <div>
      {loading && <p className="text-sm text-ink/60">লোড হচ্ছে...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="text-sm text-ink/60">এখনো কোনো অর্ডার আসেনি।</p>
      )}
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border border-vine-light/20 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ink">
                  #{o.id} — {o.customerName}
                </p>
                <p className="text-xs text-ink/60">
                  {o.phone} {o.address ? `• ${o.address}` : ""}
                </p>
                <p className="mt-0.5 text-xs text-ink/40">{o.createdAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLOR[o.status]}`}>
                  {STATUS_LABEL[o.status] || o.status}
                </span>
                <select
                  value={o.status}
                  onChange={(e) => handleStatus(o.id, e.target.value)}
                  className="rounded-lg border border-vine-light/30 px-2 py-1 text-xs outline-none"
                >
                  {Object.entries(STATUS_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(o.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                  aria-label="মুছুন"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 divide-y divide-vine-light/10 border-t border-vine-light/10 pt-2">
              {o.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 text-sm">
                  <span className="text-ink/80">
                    {it.name} × {it.qty}
                  </span>
                  <span className="font-medium text-ink">৳{it.price * it.qty}</span>
                </div>
              ))}
            </div>
            {o.note && <p className="mt-2 text-xs italic text-ink/60">মন্তব্য: {o.note}</p>}
            <div className="mt-2 flex justify-end">
              <span className="text-sm font-extrabold text-vine-dark">সর্বমোট: ৳{o.total}</span>
            </div>
          </div>
        ))}
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
          <h1 className="text-lg font-extrabold text-vine-dark">বৃক্ষবীথি অ্যাডমিন প্যানেল</h1>
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
