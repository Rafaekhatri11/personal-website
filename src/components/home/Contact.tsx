"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { budgets, site, testimonials, topics, type ServiceTopic } from "@/content/site";
import { PREFILL_EVENT, type Prefill } from "@/lib/prefill";
import { Tiles } from "@/components/ui/Tiles";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, GitHub, LinkedIn, WhatsApp } from "@/components/ui/Icons";
import { SplitText } from "@/components/ui/SplitText";

const whatsappGreeting = "Hi Rafae, I found you through rafaek.com and would like to chat about a project.";

function Availability() {
  return (
    <div className="flex items-center gap-2 font-mono text-[13px] text-[#B9B7AF] md:text-sm">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-go/70" />
        <span className="relative inline-flex size-2 rounded-full bg-go" />
      </span>
      {site.location} · Available during {site.hours}
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <div className="relative flex items-center gap-3 rounded-[14px] bg-ink-2 px-4 py-3.5 md:px-[18px] md:py-4">
      <a href={`mailto:${site.email}`} className="flex-1 truncate text-base font-semibold hover:text-coral md:text-xl">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="min-h-9 rounded-full border border-[#6B6A64] px-3.5 py-2 text-[13px] transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute -top-10 right-0 rounded-full bg-ivory px-3 py-1.5 text-xs font-semibold text-ink shadow-lg transition-all duration-300 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {copied ? "Email copied ✓" : ""}
      </span>
    </div>
  );
}

const field =
  "h-12 w-full rounded-xl border border-line bg-white px-3.5 text-[15px] shadow-[0_1px_0_rgba(27,27,25,.03)] outline-none transition-all placeholder:text-faint hover:border-faint focus:border-brick focus:ring-4 focus:ring-brick/10";

const labelCls = "text-[13px] font-semibold tracking-[-0.005em] text-ink";

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 8.5l3.2 3.2L13 4.8" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function BudgetSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, budgets.indexOf(value)));
    setOpen(true);
  };
  const pick = (b: string) => {
    onChange(b);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % budgets.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + budgets.length) % budgets.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (active >= 0) pick(budgets[active]);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <input type="hidden" name="budget" value={value} />
      <button
        ref={btnRef}
        id="c-budget"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="c-budget-list"
        onClick={() => (open ? setOpen(false) : openList())}
        className={`${field} flex items-center justify-between gap-3 text-left ${open ? "!border-brick !ring-4 !ring-brick/10" : ""}`}
      >
        <span className={value ? "text-ink" : "text-faint"}>{value || "Select a range"}</span>
        <Chevron className={`size-4 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180 text-brick" : ""}`} />
      </button>
      <ul
        id="c-budget-list"
        role="listbox"
        aria-label="Budget range"
        className={`absolute inset-x-0 top-[calc(100%+6px)] z-20 origin-top overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(27,27,25,.28)] transition-all duration-200 ease-out-expo ${
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-1 scale-[.98] opacity-0"
        }`}
      >
        {budgets.map((b, i) => {
          const selected = b === value;
          return (
            <li
              key={b}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(b)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                i === active ? "bg-ivory" : ""
              } ${selected ? "font-semibold text-brick" : "text-ink"}`}
            >
              {b}
              {selected && <Check className="size-4" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const [topic, setTopic] = useState<ServiceTopic>("SaaS / web app");
  const [budget, setBudget] = useState("");
  const [count, setCount] = useState(0);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<Prefill>).detail;
      setTopic(d.topic);
      if (d.message && msgRef.current && !msgRef.current.value) {
        msgRef.current.value = d.message;
        setCount(d.message.length);
      }
      setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus({ preventScroll: true }), 900);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (state.status === "fallback" && state.mailto) window.location.href = state.mailto;
    if (state.status === "ok") {
      formRef.current?.reset();
      setBudget("");
      setCount(0);
    }
  }, [state]);

  const err = state.errors ?? {};

  return (
    <form
      ref={formRef}
      // Submit via onSubmit rather than `action` so React doesn't auto-reset the fields
      // when the server returns validation errors; we reset manually on success.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="relative flex w-full flex-col gap-5 rounded-2xl border border-white/60 bg-ivory p-5 text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,.55)] ring-1 ring-black/5 md:gap-6 md:rounded-[24px] md:p-9 lg:w-[540px] lg:shrink-0"
    >
      <span aria-hidden className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-brick via-coral to-brick" />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <input type="hidden" name="topic" value={topic} />

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">Start a project</h3>
        <p className="text-sm text-muted">Tell me a bit about what you need and I’ll get back within 24 hours.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-name" className={labelCls}>
            Name
          </label>
          <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Jane Doe" required aria-invalid={!!err.name} className={field} />
          {err.name && <span className="text-xs text-brick">{err.name}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-email" className={labelCls}>
            Work email
          </label>
          <input id="c-email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" required aria-invalid={!!err.email} className={field} />
          {err.email && <span className="text-xs text-brick">{err.email}</span>}
        </div>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${labelCls} mb-2.5`}>I need help with</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(t)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                  on
                    ? "border-brick bg-brick text-white shadow-[0_6px_16px_-6px_rgba(194,46,34,.6)]"
                    : "border-line bg-white text-body hover:-translate-y-px hover:border-ink hover:text-ink"
                }`}
              >
                {on && <Check className="size-3.5" />}
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-budget" className={labelCls}>
          Budget range <span className="font-normal text-faint">· optional</span>
        </label>
        <BudgetSelect value={budget} onChange={setBudget} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="c-msg" className={labelCls}>
            Tell me about the project
          </label>
          <span className="font-mono text-xs text-faint">{count}/1000</span>
        </div>
        <textarea
          id="c-msg"
          ref={msgRef}
          name="message"
          required
          maxLength={1000}
          placeholder="What are you building, and what does success look like?"
          onChange={(e) => setCount(e.target.value.length)}
          aria-invalid={!!err.message}
          className={`${field} h-[120px] resize-none py-3 leading-relaxed`}
        />
        {err.message && <span className="text-xs text-brick">{err.message}</span>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="group shine inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-brick text-base font-semibold text-white shadow-[0_12px_28px_-10px_rgba(194,46,34,.75)] transition-all hover:-translate-y-0.5 hover:bg-brick-dark disabled:translate-y-0 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
        {!pending && <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      </button>
      <p role="status" aria-live="polite" className={`text-sm empty:hidden ${state.status === "error" ? "text-brick" : "text-go"}`}>
        {state.status !== "idle" ? state.message : ""}
      </p>
      {site.calendarUrl && (
        <>
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>
          <a
            href={site.calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-ink p-3.5 text-center text-[15px] font-semibold transition-colors hover:bg-ink hover:text-ivory"
          >
            Pick a time on my calendar →
          </a>
        </>
      )}
    </form>
  );
}

export function Contact() {
  const num = testimonials.length ? "09" : "08";
  return (
    <div className="px-3 md:px-[60px]">
      <section
        id="contact"
        className="relative isolate mx-auto flex max-w-[1320px] flex-col gap-8 overflow-hidden rounded-[22px] bg-ink px-5 py-9 text-ivory md:rounded-[28px] md:px-[60px] md:py-[72px] lg:flex-row lg:gap-16"
      >
        <Tiles
          corner="top-right"
          dark
          strength={0.4}
          tiles={[
            { right: 0, top: 0, delay: 0 },
            { right: 112, top: 112, delay: 2.2 },
            { left: 0, bottom: 0, delay: 4 },
          ]}
        />
        <Reveal className="flex flex-1 flex-col gap-5 md:gap-6">
          <div className="font-mono text-xs uppercase tracking-[.08em] text-coral">Contact</div>
          <SplitText className="text-[clamp(2.125rem,1.2rem+3.8vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em]" text="Have a project in mind? Let’s talk." />
          <p className="text-[15px] leading-relaxed text-mist md:text-[17px]">
            Open to full-time roles, contract work and freelance projects. Reply within 24 hours.
          </p>
          <CopyEmail />
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group -mt-1 inline-flex items-center gap-2 self-start text-[15px] text-mist transition-colors hover:text-ivory"
          >
            <WhatsApp className="size-[18px] text-[#25D366]" />
            Prefer WhatsApp? <span className="font-semibold text-ivory underline decoration-[#25D366]/60 underline-offset-4 group-hover:decoration-[#25D366]">Message me</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 rounded-xl border border-ink-3 px-4 py-3.5 text-[15px] transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
            >
              <LinkedIn className="size-4" /> LinkedIn
              <ArrowUpRight className="ml-auto size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 rounded-xl border border-ink-3 px-4 py-3.5 text-[15px] transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
            >
              <GitHub className="size-4" /> GitHub
              <ArrowUpRight className="ml-auto size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <Availability />
        </Reveal>
        <ContactForm />
      </section>
    </div>
  );
}
