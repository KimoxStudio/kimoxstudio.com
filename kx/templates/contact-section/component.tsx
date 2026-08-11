"use client";

import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import { submitContact } from "@/app/actions/contact";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import type { z } from "zod";
import type { contactSectionSchema } from "./schema";

type Props = z.infer<typeof contactSectionSchema>;

const CONTACT_FEEDBACK = {
  sent: {
    es: "✓ Enviado. Te respondemos en menos de 24h.",
    en: "✓ Sent. We reply within 24h.",
    ja: "✓ 送信しました。24時間以内に返信します。",
  },
  rate_limited: {
    es: "Has enviado demasiados mensajes. Prueba en un rato.",
    en: "You have sent too many messages. Try again in a while.",
    ja: "短時間に送信が多すぎます。しばらく経ってからお試しください。",
  },
  too_fast: {
    es: "El formulario se envió demasiado rápido. ¿Eres un bot?",
    en: "The form was sent too quickly. Are you a bot?",
    ja: "フォームの送信が早すぎます。ボットでしょうか？",
  },
  invalid: {
    es: "Revisa los campos: hay algo que no encaja.",
    en: "Please check the fields, something doesn't fit.",
    ja: "入力内容を確認してください。",
  },
  send_failed: {
    es: "No pudimos enviar el mensaje. Escríbenos directamente al email.",
    en: "We couldn't send your message. Please email us directly.",
    ja: "送信できませんでした。メールでご連絡ください。",
  },
  generic: {
    es: "Algo salió mal. Inténtalo de nuevo en un momento.",
    en: "Something went wrong. Please try again.",
    ja: "エラーが発生しました。再度お試しください。",
  },
};

// Re-homes the Contact section. Keeps the honeypot + timing gate + budget
// chips + localized feedback banner, and binds the original `submitContact`
// server action (kept as an island in app/actions/contact.js).
export function ContactSectionComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const [budgetIdx, setBudgetIdx] = useState<number | null>(null);
  const [status, setStatus] = useState<{ state: string; error: string | null }>({
    state: "idle",
    error: null,
  });
  const [pending, startTransition] = useTransition();
  const loadedAt = useMemo(() => Date.now(), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const budgets = resolveLocalized(props.budgets, lang, "es") ?? [];
    if (budgetIdx != null) formData.set("budget", budgets[budgetIdx] ?? "");
    else formData.set("budget", "");
    formData.set("loadedAt", String(loadedAt));
    formData.set("lang", lang);
    setStatus({ state: "sending", error: null });
    startTransition(async () => {
      try {
        const result = await submitContact(null, formData);
        if (result?.ok) {
          setStatus({ state: "sent", error: null });
          form.reset();
          setBudgetIdx(null);
        } else {
          setStatus({ state: "error", error: result?.error || "generic" });
        }
      } catch {
        setStatus({ state: "error", error: "generic" });
      }
    });
  };

  const feedback = (key: string) =>
    (CONTACT_FEEDBACK[key as keyof typeof CONTACT_FEEDBACK] &&
      CONTACT_FEEDBACK[key as keyof typeof CONTACT_FEEDBACK][lang]) ||
    CONTACT_FEEDBACK.generic[lang];

  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(
    /(algo|something|何か)/,
    (m) => `<em>${m}</em>`,
  );
  const budgets = resolveLocalized(props.budgets, lang, "es") ?? [];
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="head">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="grid">
          <div>
            <p className="body" {...kxField(`body.${lang}`)}>{resolveLocalized(props.body, lang, "es")}</p>
            <a href={`mailto:${props.email}`} className="email-big">
              <span className="or" {...kxField(`or.${lang}`)}>{resolveLocalized(props.or, lang, "es")}</span>
              <span className="em">{props.email}</span>
            </a>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot — hidden from real users, bots fill it. */}
            <div className="honeypot" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </label>
            </div>
            <div className="form-row">
              <div className="field">
                <label>
                  <span>01 · {resolveLocalized(props.fieldName, lang, "es")}</span>
                </label>
                <input type="text" name="name" required maxLength={120} />
              </div>
              <div className="field">
                <label>
                  <span>02 · {resolveLocalized(props.fieldEmail, lang, "es")}</span>
                </label>
                <input type="email" name="email" required maxLength={200} />
              </div>
            </div>
            <div className="field">
              <label>
                <span>03 · {resolveLocalized(props.fieldBudget, lang, "es")}</span>
                <span className="opt">
                  {lang === "ja" ? "任意" : lang === "en" ? "optional" : "opcional"}
                </span>
              </label>
              <div className="budget-chips">
                {budgets.map((b, i) => (
                  <button
                    type="button"
                    key={i}
                    className={budgetIdx === i ? "active" : ""}
                    onClick={() => setBudgetIdx(i)}
                    {...kxField(`budgets.${lang}.${i}`)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>
                <span>04 · {resolveLocalized(props.fieldMessage, lang, "es")}</span>
              </label>
              <textarea
                name="message"
                required
                minLength={8}
                maxLength={4000}
                placeholder={lang === "ja" ? "..." : lang === "en" ? "Tell us..." : "Cuéntanos..."}
              />
            </div>
            <div className="submit-row">
              <button
                type="submit"
                className="btn-primary"
                disabled={pending || status.state === "sending"}
              >
                <span>
                  {status.state === "sending" || pending
                    ? lang === "ja"
                      ? "送信中…"
                      : lang === "en"
                        ? "Sending…"
                        : "Enviando…"
                    : status.state === "sent"
                      ? "✓ " + (lang === "ja" ? "送信しました" : lang === "en" ? "Sent" : "Enviado")
                      : resolveLocalized(props.fieldSend, lang, "es")}
                </span>
                <span className="arr">↗</span>
              </button>
              <span className="note">
                {lang === "ja"
                  ? "返信は24時間以内"
                  : lang === "en"
                    ? "Reply within 24h"
                    : "Respuesta en menos de 24h"}
              </span>
            </div>
            <p className="privacy-note">
              {lang === "ja" ? (
                <>
                  ご入力いただいたデータはご依頼への対応のために使用されます。詳細は
                  <Link href="/politica-privacidad">プライバシーポリシー</Link>をご覧ください。
                </>
              ) : lang === "en" ? (
                <>
                  Your data will be processed to handle your request. More information in our{" "}
                  <Link href="/politica-privacidad">Privacy Policy</Link>.
                </>
              ) : (
                <>
                  Tus datos serán tratados para atender tu solicitud. Más información en
                  nuestra <Link href="/politica-privacidad">Política de Privacidad</Link>.
                </>
              )}
            </p>
            {status.state === "sent" && (
              <div className="form-feedback success">{feedback("sent")}</div>
            )}
            {status.state === "error" && (
              <div className="form-feedback error">{feedback(status.error ?? "generic")}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
