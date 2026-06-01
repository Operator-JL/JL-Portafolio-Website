import { Clock, Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { CONTACT } from "../../data/content";
import Toast from "../ui/Toast";
import SectionTitle from "../ui/SectionTitle";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact({ contact, selectedService, onServiceChange, onOpenWhatsApp, onOpenEmail }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const updateService = (value) => {
    onServiceChange(value);
    setErrors((current) => ({ ...current, service: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const labels = contact.form.errors;

    if (!form.name.trim()) {
      nextErrors.name = labels.name;
    }

    if (!isValidEmail(form.email.trim())) {
      nextErrors.email = labels.email;
    }

    if (!selectedService) {
      nextErrors.service = labels.service;
    }

    if (!form.message.trim()) {
      nextErrors.message = labels.message;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildEmailBody = () => {
    const labels = contact.emailBodyLabels;
    const serviceLabel =
      contact.form.options.find((option) => option.value === selectedService)?.label ?? selectedService;

    return [
      labels.greeting,
      "",
      labels.name,
      form.name.trim(),
      "",
      labels.email,
      form.email.trim(),
      "",
      labels.service,
      serviceLabel,
      "",
      labels.message,
      form.message.trim(),
    ].join("\n");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      CONTACT.emailSubject,
    )}&body=${encodeURIComponent(buildEmailBody())}`;

    setToast(contact.toast);
    window.setTimeout(() => {
      window.location.href = mailto;
    }, 220);
    window.setTimeout(() => setToast(""), 2600);
  };

  return (
    <section id="contacto" className="section-container scroll-mt-24 py-20 lg:py-28">
      <div className="contact-showcase grid gap-10 rounded-lg border border-white/10 bg-white/[0.025] p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-sm sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:p-8">
        <div>
          <SectionTitle eyebrow={contact.eyebrow} title={contact.title} align="left" />
          <div className="mt-7 space-y-5 text-base leading-8 text-slate-300">
            {contact.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
              <Clock size={18} className="mb-3 text-cyan-200" aria-hidden="true" />
              <p className="text-sm font-semibold text-white">{contact.availability}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
              <Mail size={18} className="mb-3 text-cyan-200" aria-hidden="true" />
              <p className="text-sm font-semibold text-white">{contact.responseTime}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="premium-button inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              onClick={onOpenWhatsApp}
            >
              <MessageCircle size={18} aria-hidden="true" />
              {contact.whatsappCta}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              onClick={onOpenEmail}
            >
              <Mail size={18} aria-hidden="true" />
              {contact.emailCta}
            </button>
          </div>
        </div>

        <form className="glass-card contact-form p-5 sm:p-7" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="contact-name"
              label={contact.form.name}
              error={errors.name}
              value={form.name}
              onChange={(value) => updateField("name", value)}
              autoComplete="name"
            />
            <Field
              id="contact-email"
              label={contact.form.email}
              error={errors.email}
              value={form.email}
              onChange={(value) => updateField("email", value)}
              autoComplete="email"
              type="email"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-200" htmlFor="contact-service">
              {contact.form.service}
            </label>
            <select
              id="contact-service"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
              value={selectedService}
              onChange={(event) => updateService(event.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "contact-service-error" : undefined}
            >
              {contact.form.options.map((option) => (
                <option key={option.value || "empty"} value={option.value} className="bg-slate-950 text-white">
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service ? (
              <p id="contact-service-error" className="mt-2 text-sm text-cyan-100">
                {errors.service}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-200" htmlFor="contact-message">
              {contact.form.message}
            </label>
            <textarea
              id="contact-message"
              className="mt-2 min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message ? (
              <p id="contact-message-error" className="mt-2 text-sm text-cyan-100">
                {errors.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="premium-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          >
            <Send size={17} aria-hidden="true" />
            {contact.form.submit}
          </button>

          <p className="mt-4 text-xs leading-6 text-slate-400">{contact.privacy}</p>
        </form>
      </div>
      <Toast message={toast} />
    </section>
  );
}

function Field({ id, label, value, error, onChange, type = "text", autoComplete }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-200" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-cyan-100">
          {error}
        </p>
      ) : null}
    </div>
  );
}
