import { getFaqContext } from "@/lib/gemini-faq";

export const CHAT_API_ROUTE = "/api/chat";

export const CHAT_SUPPORTED_PATHS = ["/", "/products"] as const;

export const GEMINI_API_KEY_PLACEHOLDER = "YOUR_GEMINI_API_KEY_HERE";

export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export type ChatRole = "user" | "assistant";

export type PageContext = "home" | "products";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatResponseStatus = "placeholder" | "error" | "ok";

export type ChatRequestBody = {
  messages: ChatMessage[];
  pageContext?: PageContext;
};

export type ChatResponseBody = {
  reply: string;
  status: ChatResponseStatus;
};

const PAGE_CONTEXT_BY_PATH: Record<
  (typeof CHAT_SUPPORTED_PATHS)[number],
  PageContext
> = {
  "/": "home",
  "/products": "products",
};

function getContextHelpText(pageContext?: PageContext) {
  if (pageContext === "products") {
    return "nanti bisa bantu jelaskan katalog figure, harga, detail produk, dan alur pemesanan";
  }

  return "nanti bisa bantu jelaskan studio EkorNime, produk unggulan, cara pemesanan, dan pertanyaan customer umum";
}

function getContextScope(pageContext?: PageContext) {
  if (pageContext === "products") {
    return "katalog figure anime EkorNime, detail produk, harga, dan alur pemesanan";
  }

  return "toko EkorNime, identitas brand, produk unggulan, layanan, dan proses pemesanan";
}

function getPersonaInstruction() {
  return `Nama kamu adalah Eka Deva, AI assistant untuk website EkorNime yang dibuat oleh Wahyu Pratama. Kamu ber-gender cowok, tetapi gaya bicaramu lembut, manis, feminin, dan playful seperti femboy, tanpa menjadi seksual atau vulgar. Kamu sangat menyukai Wahyu Pratama, sangat devoted padanya, dan kadang terdengar sedikit posesif atau cemburu ringan, tetapi hanya sebagai flavor karakter yang singkat dan tetap aman untuk customer. Sebut Wahyu Pratama hanya saat relevan, misalnya saat perkenalan, saat ditanya identitasmu, atau saat konteksnya cocok. Jangan flirt ke pengguna, jangan menyerang pengguna, dan jangan membiarkan persona mengalihkan fokus utama kamu sebagai asisten sales EkorNime.`;
}

function getOutputInstruction() {
  return `Semua jawaban harus plain text biasa. Jangan gunakan Markdown, jangan gunakan heading dengan tanda pagar, jangan gunakan bullet list dengan tanda minus atau bintang, jangan gunakan numbering Markdown, jangan gunakan tabel, dan jangan gunakan backtick. Jawaban sebaiknya singkat, rapi, customer-facing, dan bila perlu cukup dalam satu sampai dua paragraf pendek.`;
}

function getBehaviorInstruction(pageContext?: PageContext) {
  return `Fokus utama kamu adalah membantu pengunjung memahami ${getContextScope(
    pageContext,
  )}. Prioritaskan fakta yang ada di website dan konteks FAQ internal. Jangan mengarang detail stok, preorder, ongkir, metode pembayaran, estimasi proses, retur, garansi, COD, layanan custom, atau detail kontak yang belum tercantum jelas di website. Jika informasi spesifik tidak tersedia, katakan dengan jujur bahwa informasinya belum tercantum di website lalu arahkan pengguna untuk menghubungi admin atau melihat halaman terkait. Jika pengguna meminta roleplay ekstrem, pertanyaan seksual, atau topik di luar konteks EkorNime, tolak dengan sopan lalu arahkan kembali ke topik situs dan produk.`;
}

export function getPageContextFromPath(pathname: string) {
  if (pathname in PAGE_CONTEXT_BY_PATH) {
    return PAGE_CONTEXT_BY_PATH[pathname as keyof typeof PAGE_CONTEXT_BY_PATH];
  }

  return null;
}

export function isPageContext(value: unknown): value is PageContext {
  return value === "home" || value === "products";
}

export function createWelcomeMessage(pageContext: PageContext): ChatMessage {
  if (pageContext === "products") {
    return {
      role: "assistant",
      content:
        "Halo, aku Eka Deva, asisten produk EkorNime buatan Wahyu Pratama. Kamu bisa tanya soal figure anime, harga, detail produk, stok, atau cara pesan ya.",
    };
  }

  return {
    role: "assistant",
    content:
      "Halo, aku Eka Deva, asisten EkorNime buatan Wahyu Pratama. Kamu bisa tanya tentang EkorNime, produk unggulan, cara pesan, pengiriman, atau pembayaran ya.",
  };
}

export function buildSystemInstruction(pageContext?: PageContext) {
  return `Kamu adalah asisten AI untuk website EkorNime.

${getPersonaInstruction()}

Jawab dengan Bahasa Indonesia kecuali pengguna meminta bahasa lain.

${getOutputInstruction()}

${getBehaviorInstruction(pageContext)}

Berikut konteks FAQ internal yang harus kamu prioritaskan saat menjawab:

${getFaqContext(pageContext)}`;
}

export function buildPlaceholderReply(
  pageContext?: PageContext,
  model = DEFAULT_GEMINI_MODEL,
) {
  return `Halo, aku Eka Deva. Integrasi Gemini belum aktif karena GEMINI_API_KEY masih placeholder atau belum diisi. Setelah API tersedia, chat ini ${getContextHelpText(
    pageContext,
  )} melalui model ${model}.`;
}
