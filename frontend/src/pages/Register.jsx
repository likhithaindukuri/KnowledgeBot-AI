import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { API_BASE, getOrganization, getToken, saveAuth } from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const org = getOrganization();
  if (getToken() && org?.slug) {
    return <Navigate to={`/org/${org.slug}/dashboard`} replace />;
  }

  const submit = async (e) => {    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Registration failed");
        return;
      }

      saveAuth(data.access_token, data.organization);
      navigate(`/org/${data.organization.slug}/dashboard`);
    } catch {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your organization"
      subtitle="Register to upload documents and deploy your AI chatbot"
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label-text">Organization name</label>
          <input
            className="input-field"
            placeholder="e.g. ABC University"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="label-text">Work email</label>
          <input
            className="input-field"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="label-text">Password</label>
          <input
            type="password"
            className="input-field"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <p className="text-xs text-neutral-500 mt-1">Minimum 6 characters</p>
        </div>

        {error && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Already registered?{" "}
        <Link to="/login" className="text-black font-medium underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
