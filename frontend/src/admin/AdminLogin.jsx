import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { api } from "../api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(username, password);
      localStorage.setItem("admin_token", token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "লগইন ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-vine-light/20 bg-white p-8 shadow-lg"
      >
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-vine/10 text-vine">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-center text-lg font-bold text-vine-dark">অ্যাডমিন লগইন</h1>
        <p className="mt-1 text-center text-sm text-ink/60">
          বৃক্ষবীথি নার্সারি ব্যবস্থাপনা প্যানেল
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">ইউজারনেম</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none focus:border-vine"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-vine-light/30 px-3 py-2.5 text-sm outline-none focus:border-vine"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="p-btn-green mt-6 w-full justify-center disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> লগইন হচ্ছে...
            </span>
          ) : (
            "লগইন করুন"
          )}
        </button>
      </form>
    </div>
  );
}
