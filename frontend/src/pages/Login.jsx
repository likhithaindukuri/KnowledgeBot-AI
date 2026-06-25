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
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your AI knowledge platform."
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
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="john@university.edu"
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
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
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
          <div className="border border-red-200 bg-red-50 rounded-xl p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-3 font-medium hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>


      <p className="mt-8 text-center text-sm text-neutral-600">

        Don't have an account?

        <Link
          to="/register"
          className="ml-1 font-semibold text-black hover:underline"
        >
          Create one
        </Link>

      </p>

    </AuthLayout>
  );
}