import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  API_BASE,
  getOrganization,
  getToken,
  saveAuth,
} from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const org = getOrganization();

  if (getToken() && org?.slug) {
    return (
      <Navigate
        to={`/org/${org.slug}/dashboard`}
        replace
      />
    );
  }

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed.");
        return;
      }

      saveAuth(data.access_token, data.organization);

      navigate(`/org/${data.organization.slug}/dashboard`);
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
    >
      <form
        onSubmit={submit}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Password
          </label>

          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-600">
        Don't have a workspace?{" "}
        <Link
          to="/register"
          className="font-semibold text-black hover:underline"
        >
          Create Workspace
        </Link>
      </p>
    </AuthLayout>
  );
}