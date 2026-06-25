import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  deleteWidgetLogo,
  fetchWidgetSettings,
  updateWidgetSettings,
  uploadWidgetLogo,
} from "../utils/api";
import { API_BASE } from "../utils/auth";

import { FaRobot } from "react-icons/fa";
import { BsChatDots, BsQuestionCircle } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Copy, ImagePlus, Trash2, Check } from "lucide-react";

const defaultSettings = {
  title: "Chat with us",
  welcome_message: "Hello! How can I help you today?",
  primary_color: "#000000",
  position: "bottom-right",
  button_size: "medium",
  widget_style: "chat",
  logo_url: null,
};

const stylePresets = [
  { id: "chat", label: "Chat", icon: BsChatDots },
  { id: "robot", label: "Robot", icon: FaRobot },
  { id: "assistant", label: "Assistant", icon: HiOutlineSparkles },
  { id: "help", label: "Help", icon: BsQuestionCircle },
];

function getTextColor(hex) {
  if (!hex) return "#fff";
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111" : "#fff";
}

export default function WidgetPage({ organization }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const iconColor = getTextColor(settings.primary_color);
  const widgetToken = organization.widget_token;

  const embedCode = useMemo(
    () =>
      `<!-- Nexus Widget -->\n<script src="${API_BASE}/widget.js" data-token="${widgetToken}" defer></script>`,
    [widgetToken]
  );

  const btnSize =
    settings.button_size === "small" ? 44 : settings.button_size === "large" ? 60 : 52;

  const activeStyle =
    stylePresets.find((s) => s.id === settings.widget_style) || stylePresets[0];
  const ActiveIcon = activeStyle.icon;

  const previewConfig = useMemo(
    () =>
      JSON.stringify({
        title: settings.title,
        welcome_message: settings.welcome_message,
        primary_color: settings.primary_color,
        position: settings.position,
        button_size: settings.button_size,
        widget_style: settings.widget_style,
        logo_url: settings.logo_url || null,
      }),
    [settings]
  );

  useEffect(() => {
    fetchWidgetSettings()
      .then((data) => setSettings((prev) => ({ ...prev, ...data })))
      .catch(() => setError("Could not load widget settings"));
  }, []);

  const reloadWidget = () => {
    document.getElementById("nx-widget-root")?.remove();
    document.getElementById("nx-live-widget")?.remove();

    const script = document.createElement("script");
    script.id = "nx-live-widget";
    script.src = `${API_BASE}/widget.js?t=${Date.now()}`;
    script.dataset.token = widgetToken;
    script.dataset.config = previewConfig;
    script.defer = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    reloadWidget();
    return () => document.getElementById("nx-widget-root")?.remove();
  }, [widgetToken, previewConfig]);

  const handleSave = async () => {
    setError("");
    setSaved(false);

    try {
      const updated = await updateWidgetSettings(settings);
      setSettings((prev) => ({ ...prev, ...updated }));
      setSaved(true);
      reloadWidget();
    } catch {
      setError("Failed to save settings");
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setError("");

    try {
      const updated = await uploadWidgetLogo(file);
      setSettings((prev) => ({ ...prev, ...updated }));
      reloadWidget();
    } catch {
      setError("Logo upload failed");
    } finally {
      setLogoUploading(false);
      event.target.value = "";
    }
  };

  const handleLogoRemove = async () => {
    setError("");
    try {
      const updated = await deleteWidgetLogo();
      setSettings((prev) => ({ ...prev, ...updated, logo_url: null }));
      reloadWidget();
    } catch {
      setError("Could not remove logo");
    }
  };

  const copyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout organization={organization} title="Widget">
      <div className="mb-8 max-w-3xl">
        <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">
          Widget customization
        </h2>
        <p className="mt-2 text-neutral-600 leading-relaxed">
          Configure how your chatbot appears on your website. Use the live preview
          in the bottom-right corner to test questions against your documents.
        </p>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,420px)_1fr] gap-8">
        <div className="space-y-5">
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Widget title
                </label>
                <input
                  className="input-field"
                  value={settings.title}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Welcome message
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={settings.welcome_message}
                  onChange={(e) =>
                    setSettings({ ...settings, welcome_message: e.target.value })
                  }
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Brand</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">
                  Accent color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200"
                    value={settings.primary_color}
                    onChange={(e) =>
                      setSettings({ ...settings, primary_color: e.target.value })
                    }
                  />
                  <span className="text-sm text-neutral-600 font-mono">
                    {settings.primary_color}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2">
                  Custom logo (optional)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-neutral-50 transition">
                    <ImagePlus size={16} />
                    {logoUploading ? "Uploading..." : "Upload logo"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={handleLogoUpload}
                      disabled={logoUploading}
                    />
                  </label>
                  {settings.logo_url && (
                    <button
                      type="button"
                      onClick={handleLogoRemove}
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  )}
                </div>
                {settings.logo_url && (
                  <div className="mt-3 inline-flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-2">
                    <img
                      src={settings.logo_url}
                      alt="Widget logo"
                      className="h-8 w-8 object-contain rounded"
                    />
                    <span className="text-xs text-neutral-500">Logo replaces style icon</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Launcher style</h3>
            <div className="grid grid-cols-4 gap-2">
              {stylePresets.map((preset) => {
                const Icon = preset.icon;
                const active = settings.widget_style === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSettings({ ...settings, widget_style: preset.id })}
                    className={`rounded-xl border p-3 transition ${
                      active
                        ? "border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900/10"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex justify-center text-lg text-neutral-900 mb-1">
                      <Icon />
                    </div>
                    <div className="text-[11px] text-center text-neutral-600">{preset.label}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Layout</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Position
                </label>
                <select
                  className="input-field"
                  value={settings.position}
                  onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                >
                  <option value="bottom-right">Bottom right</option>
                  <option value="bottom-left">Bottom left</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">Size</label>
                <select
                  className="input-field"
                  value={settings.button_size}
                  onChange={(e) => setSettings({ ...settings, button_size: e.target.value })}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </section>

          <button onClick={handleSave} className="btn-primary w-full">
            Save settings
          </button>

          {saved && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5">
              Settings saved. Preview widget updated.
            </p>
          )}
          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-neutral-100">
              <h3 className="font-semibold text-neutral-900">Static preview</h3>
              <p className="text-sm text-neutral-500 mt-1">
                How the launcher and header will look on your site
              </p>
            </div>

            <div className="relative h-[480px] bg-[linear-gradient(180deg,#fafafa_0%,#f3f4f6_100%)] p-8">
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white/70 h-full flex items-center justify-center text-sm text-neutral-400">
                Your website content area
              </div>

              <div
                className="absolute bottom-6 right-6 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: settings.primary_color,
                  width: btnSize,
                  height: btnSize,
                }}
              >
                {settings.logo_url ? (
                  <img
                    src={settings.logo_url}
                    alt=""
                    className="w-[70%] h-[70%] object-contain"
                  />
                ) : (
                  <span style={{ color: iconColor }} className="text-xl">
                    <ActiveIcon />
                  </span>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
              <p className="font-medium text-neutral-900">{settings.title}</p>
              <p className="text-sm text-neutral-500 mt-1">{settings.welcome_message}</p>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-neutral-900">Embed script</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Paste before the closing <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">&lt;/body&gt;</code> tag.
                  Your token is unique and cannot be guessed from your organization name.
                </p>
              </div>
              <button
                type="button"
                onClick={copyEmbed}
                className="inline-flex items-center gap-2 shrink-0 rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 transition"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="rounded-xl bg-neutral-950 text-neutral-100 text-xs p-4 overflow-x-auto leading-6">
              {embedCode}
            </pre>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
