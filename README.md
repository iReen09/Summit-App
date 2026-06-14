# Summit Gear

Panduan instalasi dan pengaturan project Summit Gear untuk lingkungan pengembangan lokal.

## Prasyarat

Pastikan perangkat sudah memiliki:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) beserta npm
- Database PostgreSQL, direkomendasikan menggunakan [Supabase](https://supabase.com/)

Versi utama teknologi yang digunakan project ini:

- Next.js 16
- React 19
- Prisma 7
- PostgreSQL

## 1. Clone Repository

```bash
git clone <URL_REPOSITORY>
cd SummitApp
```

Jika repository sudah tersedia secara lokal, masuk langsung ke direktori project.

## 2. Instal Dependensi

```bash
npm install
```

Pada Windows PowerShell, gunakan `npm.cmd` jika eksekusi `npm.ps1` diblokir oleh execution policy:

```powershell
npm.cmd install
```

## 3. Konfigurasi Environment

Salin file `.env.example` menjadi `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

Kemudian isi nilai pada `.env` sesuai layanan yang digunakan.

### Variabel Wajib

| Variabel | Kegunaan |
| --- | --- |
| `APP_URL` | URL aplikasi lokal, gunakan `http://localhost:3000`. |
| `NODE_ENV` | Mode aplikasi, gunakan `development` untuk pengembangan lokal. |
| `DATABASE_URL` | Koneksi database saat aplikasi berjalan. Untuk Supabase, gunakan transaction pooler port `6543`. |
| `DIRECT_URL` | Koneksi database untuk migrasi dan seed. Untuk Supabase, gunakan session pooler atau koneksi langsung port `5432`. |
| `AUTH_SECRET` | Secret aman untuk proses autentikasi. |
| `AUTH_TRUST_HOST` | Gunakan `true` untuk mempercayai host aplikasi lokal. |

Contoh konfigurasi koneksi Supabase:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres"
```

Jangan menyimpan kredensial asli ke Git. File `.env` sudah diabaikan melalui `.gitignore`.

### Variabel Opsional

Isi variabel berikut hanya jika fitur terkait akan digunakan:

- `AUTH_GOOGLE_ID` dan `AUTH_GOOGLE_SECRET`: login Google.
- `AUTH_APPLE_ID` dan `AUTH_APPLE_SECRET`: login Apple.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY`: integrasi Supabase.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, dan `CLOUDINARY_API_SECRET`: penyimpanan gambar Cloudinary.
- `BREVO_API_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, dan `EMAIL_FROM`: pengiriman email.
- `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`, `MIDTRANS_IS_PRODUCTION`, dan `MIDTRANS_MOCK_ENABLED`: pembayaran Midtrans.
- `RAJAONGKIR_API_KEY` dan `BINDERBYTE_API_KEY`: layanan pengiriman.
- `NEXT_PUBLIC_GA_ID` dan `SENTRY_DSN`: analytics dan monitoring.

## 4. Siapkan Database dengan Prisma

Generate Prisma Client:

```bash
npm run prisma:generate
```

Terapkan migrasi database:

```bash
npm run prisma:migrate
```

Isi database dengan data awal:

```bash
npm run db:seed
```

Untuk membuka Prisma Studio:

```bash
npm run prisma:studio
```

Pada Windows PowerShell, ganti `npm` dengan `npm.cmd` untuk seluruh perintah di atas jika diperlukan.

### Akun Admin Hasil Seed

Setelah seed berhasil dijalankan, gunakan akun berikut:

```text
Email: admin@summitgear.local
Password: Password123!
```

Akun ini hanya ditujukan untuk pengembangan lokal.

## 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Perintah Project

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan development server. |
| `npm run build` | Generate Prisma Client dan membuat production build. |
| `npm run start` | Menjalankan production build. |
| `npm run lint` | Menjalankan pemeriksaan ESLint. |
| `npm run prisma:generate` | Generate Prisma Client. |
| `npm run prisma:migrate` | Menjalankan migrasi Prisma untuk development. |
| `npm run prisma:studio` | Membuka Prisma Studio. |
| `npm run db:seed` | Mengisi database dengan data awal. |
| `npm run verify:sprint3` | Menjalankan verifikasi backend Sprint 3. |
| `npm run verify:sprint4` | Menjalankan verifikasi backend Sprint 4. |
| `npm run verify:sprint5` | Menjalankan verifikasi backend Sprint 5. |

Untuk memverifikasi project secara umum:

```bash
npm run lint
npm run build
```

Untuk mencoba production build secara lokal:

```bash
npm run build
npm run start
```

## Troubleshooting

### `npm.ps1` tidak dapat dijalankan di Windows PowerShell

Gunakan executable npm Windows secara langsung:

```powershell
npm.cmd run dev
```

### Prisma gagal terhubung ke database

- Pastikan `DATABASE_URL` dan `DIRECT_URL` di `.env` sudah benar.
- Pastikan password database dan region Supabase sesuai.
- Gunakan `DIRECT_URL` port `5432` untuk migrasi dan seed.
- Pastikan project Supabase aktif dan koneksi jaringan tidak diblokir.

### Prisma Client belum tersedia atau tidak sesuai schema

Jalankan ulang:

```bash
npm run prisma:generate
```

### Data awal belum tersedia

Pastikan migrasi berhasil, kemudian jalankan:

```bash
npm run db:seed
```

### Port `3000` sedang digunakan

Hentikan proses yang menggunakan port tersebut atau jalankan Next.js pada port lain:

```bash
npm run dev -- --port 3001
```
