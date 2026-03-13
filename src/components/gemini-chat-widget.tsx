"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CHAT_API_ROUTE,
  createWelcomeMessage,
  getPageContextFromPath,
  type ChatMessage,
  type ChatResponseBody,
  type ChatResponseStatus,
} from "@/lib/gemini-chat";

type UiChatMessage = ChatMessage & {
  id: string;
};

function createMessageId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createUiMessage(message: ChatMessage): UiChatMessage {
  return {
    ...message,
    id: createMessageId(),
  };
}

function extractChatPayload(messages: UiChatMessage[]): ChatMessage[] {
  return messages.map(({ role, content }) => ({
    role,
    content,
  }));
}

export default function GeminiChatWidget() {
  const pathname = usePathname();
  const pageContext = getPageContextFromPath(pathname);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ChatResponseStatus | null>(null);
  const [messages, setMessages] = useState<UiChatMessage[]>([]);

  useEffect(() => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;

    if (!pageContext) {
      setIsOpen(false);
      return;
    }

    setDraft("");
    setStatus(null);
    setIsSubmitting(false);
    setMessages([createUiMessage(createWelcomeMessage(pageContext))]);
  }, [pageContext]);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: messages.length > 1 ? "smooth" : "auto",
      block: "end",
    });
  }, [isOpen, messages]);

  if (!pageContext) {
    return null;
  }

  const title =
    pageContext === "products"
      ? "Asisten Eka ヾ(≧▽≦*)o"
      : "Asisten Eka (≧∀≦)ゞ";
  const subtitle =
    pageContext === "products"
      ? "Asisten untuk koleksi figure"
      : "Asisten untuk studio dan pemesanan";
  const inputPlaceholder =
    pageContext === "products"
      ? "Tanya soal figure anime EkorNime..."
      : "Tanya soal EkorNime...";
  const footerMessage =
    status === "error"
      ? "Koneksi ke Gemini gagal. Coba kirim lagi."
      : status === "placeholder"
        ? "GEMINI_API_KEY belum diisi. Chat masih mode placeholder."
        : status === "ok"
          ? "Gemini aktif dan siap membantu."
          : "Tanyakan apa pun tentang EkorNime.";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedDraft = draft.trim();

    if (!trimmedDraft || isSubmitting) {
      return;
    }

    const userMessage = createUiMessage({
      role: "user",
      content: trimmedDraft,
    });
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft("");
    setIsSubmitting(true);

    try {
      const abortController = new AbortController();
      activeRequestRef.current = abortController;

      const response = await fetch(CHAT_API_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
        body: JSON.stringify({
          messages: extractChatPayload(nextMessages),
          pageContext,
        }),
      });

      const data = (await response.json()) as Partial<ChatResponseBody>;

      if (typeof data.reply !== "string" || typeof data.status !== "string") {
        throw new Error("Invalid chat response");
      }

      setStatus(data.status);
      setMessages((currentMessages) => [
        ...currentMessages,
        createUiMessage({
          role: "assistant",
          content: data.reply as string,
        }),
      ]);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setStatus("error");
      setMessages((currentMessages) => [
        ...currentMessages,
        createUiMessage({
          role: "assistant",
          content:
            "Maaf, chat sedang bermasalah. Coba lagi beberapa saat lagi.",
        }),
      ]);
    } finally {
      activeRequestRef.current = null;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section className="mb-4 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-[28px] border border-white/60 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.28)] backdrop-blur">
          <div className="bg-gradient-to-br from-orange-500 via-amber-400 to-cyan-500 px-5 py-4 text-slate-950">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-900/70">
                  Chat Assistant
                </p>
                <h2 className="mt-1 text-xl font-black">{title}</h2>
                <p className="mt-1 text-sm text-slate-900/80">{subtitle}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-slate-900 transition hover:bg-white"
                onClick={() => setIsOpen(false)}
                aria-label="Tutup chat Gemini"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 px-4 py-4">
            <div className="h-[320px] overflow-y-auto pr-1">
              <div className="space-y-3">
                {messages.map((message) => {
                  const isUser = message.role === "user";

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                          isUser
                            ? "rounded-br-lg bg-slate-900 text-white"
                            : "rounded-bl-lg border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  );
                })}

                {isSubmitting ? (
                  <div className="flex justify-start">
                    <div className="rounded-3xl rounded-bl-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                      Gemini sedang menyiapkan balasan...
                    </div>
                  </div>
                ) : null}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <label htmlFor="gemini-chat-input" className="sr-only">
                Pesan untuk Gemini
              </label>
              <input
                id="gemini-chat-input"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={inputPlaceholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                disabled={isSubmitting}
                maxLength={500}
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs leading-5 text-slate-500">
                  {footerMessage}
                </p>

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={isSubmitting || draft.trim().length === 0}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-label={isOpen ? "Tutup chat Gemini" : "Buka chat Gemini"}
        aria-expanded={isOpen}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-cyan-500 text-slate-950 shadow-[0_18px_40px_rgba(249,115,22,0.35)] transition hover:scale-[1.03] hover:shadow-[0_22px_48px_rgba(6,182,212,0.35)]"
      >
        <span className="absolute inset-0 rounded-full border border-white/50" />
        <svg
          className="relative h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 10H16M8 14H13M21 11.5C21 16.1944 16.9706 20 12 20C10.6137 20 9.30072 19.7041 8.13608 19.1757L3 20L4.03389 16.0652C3.38087 14.7631 3 13.2996 3 11.75C3 7.05558 7.02944 3.25 12 3.25C16.9706 3.25 21 7.05558 21 11.75V11.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
