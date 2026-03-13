import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import {
  buildSystemInstruction,
  buildPlaceholderReply,
  DEFAULT_GEMINI_MODEL,
  GEMINI_API_KEY_PLACEHOLDER,
  isPageContext,
  type ChatMessage,
  type ChatRequestBody,
  type ChatResponseBody,
  type PageContext,
} from "@/lib/gemini-chat";

export const runtime = "nodejs";

function createChatResponse(body: ChatResponseBody, status = 200) {
  return NextResponse.json(body, { status });
}

function sanitizePageContext(value: unknown): PageContext | undefined {
  if (isPageContext(value)) {
    return value;
  }

  return undefined;
}

function sanitizeMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((message): message is ChatMessage => {
      if (typeof message !== "object" || message === null) {
        return false;
      }

      const candidate = message as Partial<ChatMessage>;

      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string"
      );
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1000),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-12);
}

function createGeminiContents(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function normalizePlainTextLine(line: string) {
  const withoutHeading = line.replace(/^\s{0,3}#{1,6}\s+/u, "");

  if (/^\s*[-|: ]+\s*$/u.test(withoutHeading)) {
    return "";
  }

  if (/^\s*\|.*\|\s*$/u.test(withoutHeading)) {
    return withoutHeading
      .replace(/^\s*\|/u, "")
      .replace(/\|\s*$/u, "")
      .split("|")
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .join(" - ");
  }

  return withoutHeading
    .replace(/^\s*[-*+•]\s+/u, "")
    .replace(/^\s*\d+[.)]\s+/u, "")
    .replace(/^\s*>\s?/u, "")
    .trimEnd();
}

function normalizePlainTextReply(text: string) {
  const withNormalizedCodeBlocks = text.replace(
    /```[a-zA-Z0-9_-]*\n?([\s\S]*?)```/gu,
    "$1",
  );
  const withoutInlineCode = withNormalizedCodeBlocks.replace(/`([^`]*)`/gu, "$1");
  const normalizedNewlines = withoutInlineCode.replace(/\r\n?/gu, "\n").trim();
  const lines = normalizedNewlines
    .split("\n")
    .map((line) => normalizePlainTextLine(line))
    .reduce<string[]>((result, line) => {
      if (line.length === 0) {
        if (result[result.length - 1] !== "") {
          result.push("");
        }

        return result;
      }

      result.push(line);
      return result;
    }, []);

  return lines.join("\n").replace(/\n{3,}/gu, "\n\n").trim();
}

export async function POST(request: Request) {
  let payload: Partial<ChatRequestBody>;

  try {
    payload = (await request.json()) as Partial<ChatRequestBody>;
  } catch {
    return createChatResponse(
      {
        reply: "Permintaan chat tidak valid.",
        status: "error",
      },
      400,
    );
  }

  const messages = sanitizeMessages(payload.messages);
  const pageContext = sanitizePageContext(payload.pageContext);

  if (messages.length === 0) {
    return createChatResponse(
      {
        reply: "Pesan tidak boleh kosong.",
        status: "error",
      },
      400,
    );
  }

  const geminiApiKey = process.env.GEMINI_API_KEY ?? GEMINI_API_KEY_PLACEHOLDER;
  const geminiModel = process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;
  const isGeminiConfigured =
    geminiApiKey.length > 0 && geminiApiKey !== GEMINI_API_KEY_PLACEHOLDER;

  if (!isGeminiConfigured) {
    return createChatResponse({
      reply: buildPlaceholderReply(pageContext, geminiModel),
      status: "placeholder",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: createGeminiContents(messages),
      config: {
        temperature: 0.4,
        maxOutputTokens: 1024,
        systemInstruction: buildSystemInstruction(pageContext),
      },
    });

    const reply = response.text ? normalizePlainTextReply(response.text) : "";

    if (!reply) {
      throw new Error("Gemini returned an empty response");
    }

    return createChatResponse({
      reply,
      status: "ok",
    });
  } catch (error) {
    console.error("Gemini chat request failed", error);

    return createChatResponse(
      {
        reply:
          "Gemini sedang tidak bisa membalas. Coba lagi beberapa saat lagi.",
        status: "error",
      },
      500,
    );
  }
}
