# EkorNime Studio Gemini AI Chat Integrated

Website EkorNime berbasis Next.js dengan integrasi:

- katalog dan testimoni dari Contentful
- halaman team dari API eksternal
- widget chat AI berbasis Gemini

README ini fokus ke setup lokal, isi file `.env`, cara menjalankan project, dan hal-hal yang perlu dicek saat ada error.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Contentful Delivery API
- Google Gemini API via `@google/genai`

## Fitur Utama

- landing page, about, products, dan team page
- data produk dan testimoni dari Contentful
- data anggota tim dari URL API yang ditentukan lewat environment variable
- API route chat di `/api/chat`
- fallback placeholder saat Gemini belum dikonfigurasi

## Struktur Singkat

```text
.
|-- src/app
|   |-- page.tsx
|   |-- about-us/page.tsx
|   |-- products/page.tsx
|   |-- team/page.tsx
|   `-- api/chat/route.ts
|-- src/components
|   |-- contentful/contentfulClient.ts
|   |-- gemini-chat-widget.tsx
|   |-- products.tsx
|   `-- testimonial.tsx
|-- src/lib
|   `-- gemini-chat.ts
|-- public/
|-- package.json
`-- README.md
```

## Prerequisites

Sebelum mulai, pastikan mesin lokal sudah punya:

- Node.js 20 atau lebih baru
- npm

Cek versi:

```bash
node -v
npm -v
```

## Install Dependencies

Kalau `node_modules` belum ada, jalankan:

```bash
npm install
```

## Setup Environment Variables

Project ini membaca konfigurasi dari file `.env` di root project.

File yang dipakai oleh aplikasi saat development lokal:

```bash
.env
```

Di repo ini nama beberapa env var memang tidak deskriptif. Jangan diganti dulu kalau belum refactor kode, karena source code saat ini membaca nama-nama tersebut secara langsung.

### Template `.env`

Buat atau isi file `.env` seperti ini:

```env
ekorjuliewangywangy=YOUR_CONTENTFUL_SPACE_ID
ekorjuliewangywangyhuhahuha=YOUR_CONTENTFUL_ACCESS_TOKEN
ekorjuliewangywangyhuhahuhaha=https://randomuser.me/api/?results=4
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
GEMINI_MODEL=gemini-2.5-flash
```

### Penjelasan Setiap Variable

`ekorjuliewangywangy`

- dipakai sebagai `Contentful Space ID`
- digunakan oleh client Contentful di `src/components/contentful/contentfulClient.ts`
- wajib diisi kalau ingin halaman produk dan testimoni tampil normal

`ekorjuliewangywangyhuhahuha`

- dipakai sebagai `Contentful Content Delivery API Access Token`
- digunakan bersama `Space ID` untuk mengambil entries dari Contentful
- wajib diisi kalau data dari Contentful ingin muncul

`ekorjuliewangywangyhuhahuhaha`

- URL endpoint untuk data team
- saat ini dipakai oleh halaman team untuk `fetch()` data profile member
- contoh default yang cocok:

```env
ekorjuliewangywangyhuhahuhaha=https://randomuser.me/api/?results=4
```

`GEMINI_API_KEY`

- API key untuk Google Gemini
- dipakai di `src/app/api/chat/route.ts`
- opsional, karena project masih bisa jalan tanpa key ini
- kalau dikosongkan atau tetap berisi placeholder, widget chat akan masuk mode placeholder dan tidak memanggil Gemini beneran

`GEMINI_MODEL`

- nama model Gemini yang dipakai API chat
- default code saat ini: `gemini-2.5-flash`
- opsional selama model tersebut valid untuk API key yang dipakai

## Cara Mendapatkan Value `.env`

### 1. Contentful

Di dashboard Contentful, ambil:

- `Space ID`
- `Content Delivery API - access token`

Lalu map ke:

```env
ekorjuliewangywangy=SPACE_ID_ANDA
ekorjuliewangywangyhuhahuha=CONTENT_DELIVERY_ACCESS_TOKEN_ANDA
```

### 2. Team API URL

Paling mudah gunakan endpoint publik berikut:

```env
ekorjuliewangywangyhuhahuhaha=https://randomuser.me/api/?results=4
```

Kalau nanti mau ganti ke API internal atau mock server sendiri, cukup ubah URL ini.

### 3. Gemini API Key

Masukkan API key Gemini ke:

```env
GEMINI_API_KEY=YOUR_REAL_GEMINI_API_KEY
```

Kalau belum punya atau belum ingin mengaktifkan chat AI, biarkan placeholder ini:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

Dengan kondisi itu:

- website tetap bisa dijalankan
- endpoint `/api/chat` tetap hidup
- balasan chat menjadi placeholder, bukan output Gemini asli

## Menjalankan Project Secara Lokal

Start development server:

```bash
npm run dev
```

Lalu buka:

```text
http://localhost:3000
```

Halaman utama yang tersedia:

- `/`
- `/about-us`
- `/products`
- `/team`

## Build Untuk Production

Jalankan build:

```bash
npm run build
```

Kalau build sukses, start production server:

```bash
npm run start
```

Secara default akan berjalan di:

```text
http://localhost:3000
```

## Scripts Yang Tersedia

`npm run dev`

- menjalankan Next.js development server

`npm run build`

- membuat production build

`npm run start`

- menjalankan hasil production build

`npm run lint`

- menjalankan lint command yang didefinisikan di `package.json`

## Perilaku Chat Gemini

Chat endpoint ada di:

```text
/api/chat
```

Perilakunya:

- jika `GEMINI_API_KEY` valid, request akan diteruskan ke Gemini
- jika `GEMINI_API_KEY` kosong atau placeholder, sistem akan mengembalikan placeholder response
- model default yang dipakai adalah `gemini-2.5-flash`

Ini berguna untuk development karena UI chat tetap bisa dites meski API key belum tersedia.

## Hal Yang Akan Rusak Kalau `.env` Salah

Kalau Contentful variables kosong:

- section produk bisa gagal load
- section testimoni bisa gagal load

Kalau URL team API kosong atau invalid:

- halaman `/team` bisa error saat fetch data

Kalau `GEMINI_API_KEY` kosong:

- website tetap jalan
- chat tidak memakai model Gemini asli

## Troubleshooting

### `Failed to fetch data` di halaman team

Penyebab paling umum:

- `ekorjuliewangywangyhuhahuhaha` belum diisi
- URL API tidak valid
- endpoint API sedang down

Solusi:

- cek isi `.env`
- gunakan:

```env
ekorjuliewangywangyhuhahuhaha=https://randomuser.me/api/?results=4
```

### Data produk atau testimoni tidak muncul

Penyebab paling umum:

- `Space ID` atau `Access Token` Contentful salah
- content model di Contentful tidak sesuai dengan struktur yang diharapkan komponen

Solusi:

- verifikasi dua env Contentful
- cek ulang content type dan data di Contentful

### Chat hanya membalas placeholder

Itu berarti salah satu dari kondisi ini terjadi:

- `GEMINI_API_KEY` belum diisi
- `GEMINI_API_KEY` masih `YOUR_GEMINI_API_KEY_HERE`
- key invalid atau request Gemini gagal

## Catatan Penting

- simpan `.env` hanya untuk lokal dan jangan commit secret ke repository publik
- nama env var yang aneh saat ini memang dipakai langsung oleh source code
- kalau ingin nama env var lebih rapi, lakukan refactor source code dulu lalu update dokumentasi

## Quick Start

Kalau ingin versi paling singkat:

1. Install dependency:

```bash
npm install
```

2. Buat `.env`:

```env
ekorjuliewangywangy=YOUR_CONTENTFUL_SPACE_ID
ekorjuliewangywangyhuhahuha=YOUR_CONTENTFUL_ACCESS_TOKEN
ekorjuliewangywangyhuhahuhaha=https://randomuser.me/api/?results=4
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
GEMINI_MODEL=gemini-2.5-flash
```

3. Jalankan project:

```bash
npm run dev
```

4. Buka browser ke `http://localhost:3000`

## Rekomendasi Lanjutan

Kalau project ini mau dirapikan lebih lanjut, langkah berikut yang paling masuk akal:

1. rename env var menjadi nama yang jelas seperti `CONTENTFUL_SPACE_ID`
2. sediakan file `.env.example`
3. tambahkan validasi env saat app startup
4. tambahkan error state yang lebih ramah di UI
