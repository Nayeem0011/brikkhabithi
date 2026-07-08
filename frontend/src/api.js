// Central place for talking to the backend.
// Set VITE_API_URL in a .env file to point at your deployed backend,
// e.g. VITE_API_URL=https://api.yourdomain.com
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function authHeaders() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.error || `অনুরোধ ব্যর্থ হয়েছে (${res.status})`);
  }
  return data;
}

export const api = {
  base: API_URL,
  imageUrl: (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  },

  // Products
  getProducts: () => fetch(`${API_URL}/api/products`).then(handle),

  createProduct: (payload) =>
    fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handle),

  updateProduct: (id, payload) =>
    fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    }).then(handle),

  deleteProduct: (id) =>
    fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    }).then(handle),

  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: formData,
    }).then(handle);
  },

  // Orders
  createOrder: (payload) =>
    fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handle),

  getOrders: () =>
    fetch(`${API_URL}/api/orders`, { headers: { ...authHeaders() } }).then(handle),

  updateOrderStatus: (id, status) =>
    fetch(`${API_URL}/api/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ status }),
    }).then(handle),

  deleteOrder: (id) =>
    fetch(`${API_URL}/api/orders/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    }).then(handle),

  // Auth
  login: (username, password) =>
    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(handle),
};
