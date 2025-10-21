# REST API Daftar Barang Cuci Sepatu

## 📋 Deskripsi Umum

Proyek ini merupakan tugas responsi untuk modul Pembuatan API dengan JavaScript. API ini dibuat menggunakan Node.js dan Express.js, berfungsi untuk mengelola data sepatu yang sedang dicuci pada sebuah layanan jasa cuci sepatu.

Tujuan utama proyek ini adalah untuk mempermudah proses pencatatan, pemantauan, dan pembaruan status cucian sepatu secara digital melalui REST API sederhana yang terintegrasi dengan database Supabase.

## 🎯 Tujuan

1. Mengimplementasikan konsep CRUD (Create, Read, Update, Delete) dalam REST API
2. Meningkatkan pemahaman penggunaan Express.js sebagai framework backend
3. Mengelola data menggunakan Supabase sebagai database
4. Membangun sistem pencatatan yang relevan dengan kebutuhan bisnis nyata
5. Deploy aplikasi ke Vercel agar dapat diakses publik

## ✨ Fitur Utama API

| Metode | Endpoint        | Deskripsi                                                                 |
| ------ | --------------- | ------------------------------------------------------------------------- |
| GET    | /               | Menampilkan informasi API dan daftar endpoint                             |
| GET    | /items          | Menampilkan seluruh daftar sepatu yang sedang dicuci                      |
| GET    | /items?status=  | Filter sepatu berdasarkan status (Sedang Dicuci, Selesai, dll)           |
| GET    | /items/:id      | Menampilkan detail sepatu berdasarkan ID                                  |
| POST   | /items          | Menambahkan data sepatu baru ke dalam daftar                              |
| PUT    | /items/:id      | Memperbarui status sepatu (misalnya dari Sedang Dicuci menjadi Selesai)  |
| DELETE | /items/:id      | Menghapus data sepatu yang sudah selesai dicuci                           |

## 📊 Struktur Data

Contoh struktur data sepatu yang disimpan:

```json
{
  "id": 1,
  "nama": "Nike Air Force 1",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-08",
  "tanggalSelesai": "-",
  "created_at": "2025-10-08T10:30:00Z"
}
```

### Keterangan Field

- **id** → Nomor unik sepatu (auto-increment)
- **nama** → Nama sepatu atau merek pelanggan
- **status** → Status proses cuci (Sedang Dicuci / Selesai / Menunggu Diambil)
- **tanggalMasuk** → Tanggal sepatu diterima untuk dicuci
- **tanggalSelesai** → Tanggal sepatu selesai dicuci (default: "-")
- **created_at** → Timestamp otomatis saat data dibuat

## 🔧 Teknologi yang Digunakan

- **Node.js** — Runtime environment untuk menjalankan JavaScript di sisi server
- **Express.js** — Framework untuk membangun REST API dengan cepat dan sederhana
- **Supabase** — Database PostgreSQL untuk penyimpanan data
- **Vercel** — Platform deployment untuk hosting API
- **dotenv** — Mengelola environment variables

## 📁 Struktur Proyek

```
rest-api-cuci-sepatu/
│
├── src/
│   ├── config/
│   │   └── supabaseClient.js       # Konfigurasi koneksi Supabase
│   ├── controllers/
│   │   └── itemController.js       # Business logic untuk items
│   ├── models/
│   │   └── itemModel.js            # Model untuk operasi database
│   └── routes/
│       └── itemRoutes.js           # Definisi routing endpoints
│
├── index.js                        # Entry point aplikasi
├── package.json                    # Dependencies dan scripts
├── vercel.json                     # Konfigurasi Vercel deployment
├── .env                            # Environment variables
├── .env.example                    # Template environment variables
├── .gitignore                      # File yang diabaikan Git
├── supabase-setup.sql              # Script SQL untuk setup database
└── README.md                       # Dokumentasi proyek
```

Proyek ini menggunakan arsitektur **MVC (Model-View-Controller)** untuk memisahkan concerns:
- **Model**: Mengelola data dan logika database
- **Controller**: Menangani business logic dan validasi
- **Routes**: Mendefinisikan endpoint API

## 📦 Instalasi dan Cara Menjalankan

### 1. Clone Repository

```bash
git clone <repository-url>
cd rest-api-cuci-sepatu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Jalankan script SQL dari file `supabase-setup.sql` di SQL Editor Supabase
4. Copy URL dan Anon Key dari project settings

### 4. Konfigurasi Environment Variables

Buat file `.env` di root folder dan isi dengan:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

### 5. Menjalankan Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📡 Contoh Request dan Response

### 1. GET / - Info API

**Response:**
```json
{
  "message": "REST API Daftar Barang Cuci Sepatu",
  "version": "1.0.0",
  "endpoints": {
    "GET /items": "Menampilkan seluruh daftar sepatu",
    "GET /items?status=": "Filter sepatu berdasarkan status",
    "POST /items": "Menambahkan data sepatu baru",
    "PUT /items/:id": "Memperbarui status sepatu",
    "DELETE /items/:id": "Menghapus data sepatu"
  }
}
```

### 2. GET /items - Menampilkan Semua Data

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "nama": "Nike Air Force 1",
      "status": "Sedang Dicuci",
      "tanggalMasuk": "2025-10-08",
      "tanggalSelesai": "-",
      "created_at": "2025-10-08T10:30:00Z"
    },
    {
      "id": 2,
      "nama": "Adidas Superstar",
      "status": "Selesai",
      "tanggalMasuk": "2025-10-05",
      "tanggalSelesai": "2025-10-07",
      "created_at": "2025-10-05T09:15:00Z"
    }
  ]
}
```

### 3. GET /items?status=Selesai - Filter Berdasarkan Status

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 2,
      "nama": "Adidas Superstar",
      "status": "Selesai",
      "tanggalMasuk": "2025-10-05",
      "tanggalSelesai": "2025-10-07",
      "created_at": "2025-10-05T09:15:00Z"
    }
  ]
}
```

### 4. GET /items/:id - Detail Sepatu

**Request:** `GET /items/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-08",
    "tanggalSelesai": "-",
    "created_at": "2025-10-08T10:30:00Z"
  }
}
```

### 5. POST /items - Menambahkan Data Baru

**Request Body:**
```json
{
  "nama": "Nike Air Max",
  "status": "Sedang Dicuci",
  "tanggalMasuk": "2025-10-08",
  "tanggalSelesai": "-"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil ditambahkan",
  "data": {
    "id": 3,
    "nama": "Nike Air Max",
    "status": "Sedang Dicuci",
    "tanggalMasuk": "2025-10-08",
    "tanggalSelesai": "-",
    "created_at": "2025-10-08T11:00:00Z"
  }
}
```

### 6. PUT /items/:id - Update Status

**Request:** `PUT /items/1`

**Request Body:**
```json
{
  "status": "Selesai",
  "tanggalSelesai": "2025-10-09"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Status sepatu berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Nike Air Force 1",
    "status": "Selesai",
    "tanggalMasuk": "2025-10-08",
    "tanggalSelesai": "2025-10-09",
    "created_at": "2025-10-08T10:30:00Z"
  }
}
```

### 7. DELETE /items/:id - Hapus Data

**Request:** `DELETE /items/1`

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil dihapus"
}
```
## 🔗 Link Deploy

**Production URL:** `https://prak-ppb-modul1-responsi.vercel.app/`
