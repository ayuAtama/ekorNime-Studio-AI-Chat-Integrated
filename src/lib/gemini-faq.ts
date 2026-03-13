export type FaqPageContext = "home" | "products";

type FaqContextScope = FaqPageContext | "all";

export type ChatFaqEntry = {
  id: string;
  question: string;
  answer: string;
  contexts: readonly FaqContextScope[];
};

const FAQ_ENTRIES: readonly ChatFaqEntry[] = [
  {
    id: "brand-overview",
    question: "Apa itu EkorNime?",
    answer:
      "EkorNime adalah studio yang fokus pada produksi dan penjualan figurine anime berkualitas tinggi dengan ciri khas karakter animal girl atau karakter berekor.",
    contexts: ["all"],
  },
  {
    id: "product-types",
    question: "Produk apa yang dijual di EkorNime?",
    answer:
      "EkorNime menjual figure atau figurine anime premium. Untuk melihat koleksi yang tersedia, arahkan pengunjung ke halaman Products.",
    contexts: ["all"],
  },
  {
    id: "how-to-order",
    question: "Bagaimana cara pesan?",
    answer:
      "Arahkan pengunjung untuk membuka halaman Products, melihat detail dan harga produk, lalu menghubungi admin untuk konfirmasi ketersediaan, harga final, pembayaran, dan proses order.",
    contexts: ["all"],
  },
  {
    id: "pricing",
    question: "Di mana lihat harga produk?",
    answer:
      "Harga ditampilkan pada kartu atau detail produk di halaman Products. Jika ada biaya tambahan, promo, atau harga final yang perlu dipastikan, sarankan untuk konfirmasi ke admin.",
    contexts: ["all"],
  },
  {
    id: "product-details",
    question: "Bagaimana cek detail produk?",
    answer:
      "Arahkan pengunjung untuk melihat deskripsi, gambar, dan informasi yang tersedia pada halaman Products. Jika detail masih belum cukup, sarankan untuk menghubungi admin.",
    contexts: ["products"],
  },
  {
    id: "stock-status",
    question: "Apakah produk ready stock atau preorder?",
    answer:
      "Jangan mengarang status stok. Sampaikan bahwa website belum menampilkan status stok atau preorder secara real-time, jadi pengunjung perlu konfirmasi ke admin.",
    contexts: ["all"],
  },
  {
    id: "shipping-coverage",
    question: "Apakah bisa kirim ke luar kota?",
    answer:
      "Jangan menjanjikan cakupan pengiriman yang tidak tertulis. Sampaikan bahwa cakupan pengiriman dan metode kirim perlu dikonfirmasi ke admin.",
    contexts: ["all"],
  },
  {
    id: "shipping-fee",
    question: "Apakah ongkir sudah termasuk?",
    answer:
      "Jangan berasumsi soal ongkir. Katakan bahwa ongkir dan total biaya akhir perlu dikonfirmasi ke admin karena belum dijelaskan rinci di website.",
    contexts: ["all"],
  },
  {
    id: "payment-methods",
    question: "Metode pembayaran apa yang tersedia?",
    answer:
      "Jangan menyebut metode pembayaran spesifik jika belum ada di website. Arahkan pengunjung untuk mengonfirmasi opsi pembayaran langsung ke admin.",
    contexts: ["all"],
  },
  {
    id: "processing-time",
    question: "Berapa lama proses pesanan?",
    answer:
      "Jangan membuat estimasi waktu yang tidak tersedia. Jelaskan bahwa estimasi proses bergantung pada produk dan perlu dikonfirmasi ke admin.",
    contexts: ["all"],
  },
  {
    id: "custom-request",
    question: "Apakah bisa custom atau request karakter?",
    answer:
      "Jangan menjanjikan layanan custom jika belum ada informasinya. Katakan bahwa permintaan custom perlu dicek dulu ke admin.",
    contexts: ["all"],
  },
  {
    id: "cash-on-delivery",
    question: "Apakah ada COD?",
    answer:
      "Jangan mengklaim COD tersedia jika belum tercantum di website. Sampaikan bahwa opsi COD perlu dikonfirmasi ke admin.",
    contexts: ["all"],
  },
  {
    id: "returns-and-warranty",
    question: "Apakah ada retur atau garansi?",
    answer:
      "Jangan mengarang kebijakan after-sales. Jelaskan bahwa retur atau garansi perlu dikonfirmasi ke admin karena kebijakannya belum dijelaskan di website.",
    contexts: ["all"],
  },
  {
    id: "contact-admin",
    question: "Kalau mau lanjut tanya atau konfirmasi, ke mana?",
    answer:
      "Arahkan pengunjung untuk menghubungi admin melalui kontak yang tersedia di website atau melihat halaman terkait, tanpa mengarang detail kontak baru.",
    contexts: ["all"],
  },
];

function isEntryRelevant(entry: ChatFaqEntry, pageContext?: FaqPageContext) {
  return (
    entry.contexts.includes("all") ||
    (pageContext !== undefined && entry.contexts.includes(pageContext))
  );
}

export function getRelevantFaqEntries(pageContext?: FaqPageContext) {
  return FAQ_ENTRIES.filter((entry) => isEntryRelevant(entry, pageContext));
}

export function getFaqContext(pageContext?: FaqPageContext) {
  return getRelevantFaqEntries(pageContext)
    .map(
      (entry, index) =>
        `FAQ ${index + 1}
Pertanyaan: ${entry.question}
Jawaban: ${entry.answer}`,
    )
    .join("\n\n");
}
