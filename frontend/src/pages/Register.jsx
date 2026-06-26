import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  API_BASE,
  getOrganization,
  getToken,
  saveAuth,
} from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Registration failed.");
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
      title="Create your workspace"
      subtitle="Register to upload documents and deploy your AI assistant."
    >
      <form
        onSubmit={submit}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Workspace Name
          </label>

          <input
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. ABC University"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Work Email
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
            minLength={6}
            autoComplete="new-password"
            placeholder="Create a password"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <p className="mt-2 text-xs text-neutral-500">
            Minimum 6 characters.
          </p>
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
          {loading ? "Creating workspace..." : "Create Workspace"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-600">
        Already have a workspace?{" "}
        <Link
          to="/login"
          className="font-semibold text-black hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}