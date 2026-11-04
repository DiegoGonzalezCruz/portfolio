"use client";

import dynamic from "next/dynamic";
import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { serviceOptions, type ServiceOption } from "@/data/services";
import { trackLeadConversion } from "@/lib/ads";

// lottie-web touches `document` on import and is heavy, so only load it after a send.
const CoffeeAnimation = dynamic(() => import("./CoffeeAnimation"), { ssr: false });

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none aria-invalid:border-danger";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {error}
    </p>
  );
}

export function ContactForm({ defaultService }: { defaultService?: ServiceOption }) {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  // Report the conversion once, and only for a real delivered inquiry.
  const conversionSent = useRef(false);
  useEffect(() => {
    if (state.lead && !conversionSent.current) {
      conversionSent.current = true;
      trackLeadConversion();
    }
  }, [state.lead]);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center">
        <CoffeeAnimation />
        <h3 className="mt-2 font-display text-2xl font-bold">Message sent!</h3>
        <p className="mt-3 max-w-sm text-muted">
          Thanks for reaching out. A confirmation is on its way to your inbox, and
          I&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={state.values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
            placeholder="Ada Lovelace"
          />
          <FieldError id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={state.values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            placeholder="ada@example.com"
          />
          <FieldError id="email-error" error={errors.email} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium">
          What do you need? <span className="font-normal text-muted">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-full border border-line bg-canvas/60 px-4 py-2 text-sm transition-colors select-none hover:border-accent/50 has-checked:border-accent has-checked:bg-accent/15 has-checked:font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan"
            >
              <input
                type="radio"
                name="service"
                value={option.value}
                defaultChecked={(state.values?.service ?? defaultService) === option.value}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          defaultValue={state.values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
          placeholder="A bit about your business and what you'd like to get done…"
        />
        <FieldError id="message-error" error={errors.message} />
      </div>

      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending && (
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
