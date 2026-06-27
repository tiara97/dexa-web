# Dexa WFH - Aplikasi Absensi & Monitoring

Aplikasi absensi _Work From Home_ (WFH) berbasis web dengan fitur foto _webcam_, lengkap dengan dashboard pemantauan untuk manajemen (Admin). Terdiri dari aplikasi _Frontend_ (React) dan _Backend_ (NestJS).

Aplikasi ini digunakan bersama dengan projek [Dexa API](https://github.com/tiara97/dexa-backend).

## 💻 Cara Instalasi & Menjalankan Aplikasi

### 1. Persiapan Database (MySQL)

1. Buat database baru di MySQL (misalnya: `dexa_db`).
2. Masukkan skrip struktur tabel dan data _dummy_ awal dengan mengeksekusi file SQL yang berada di `dexa-backend/schema.sql`.

### 2. Menjalankan Backend (NestJS)

1. Buka terminal dan masuk ke direktori `dexa-backend`.
2. Sesuaikan file `.env` dengan kredensial database MySQL Anda.
3. Jalankan instalasi dependensi dengan perintah:
   ```bash
   npm install
   ```
4. Jalankan _server backend_ dengan perintah:
   ```bash
   npm run dev
   ```
   _(Backend akan berjalan di port `5000`)_

### 3. Menjalankan Frontend (React)

1. Buka terminal baru dan masuk ke direktori `dexa-web`.
2. Buat file `.env` di direktori utama `dexa-web` dan sesuaikan dengan URL backend Anda (opsional jika berbeda dari bawaan):
   ```env
   API_URL=http://localhost:5000/api
   ```
3. Jalankan instalasi dependensi dengan perintah:
   ```bash
   npm install
   ```
3. Jalankan aplikasi _frontend_ dengan perintah:
   ```bash
   npm start
   ```
   _(Frontend akan berjalan di port `3000` dan otomatis terbuka di browser)_

---

## 🚀 Fitur di Setiap Halaman (Page)

### 1. Halaman Login (`/login`)

- **Fungsi**: Pintu masuk bagi semua pengguna (Karyawan maupun Admin).
- **Fitur**: Login menggunakan kombinasi **NIP** dan **Password**. Aplikasi akan otomatis membedakan tampilan berdasarkan hak akses (_role_) setelah login berhasil.

### 2. Halaman Absensi Karyawan (`/employee` atau `/admin/absensi`)

- **Fungsi**: Halaman untuk mencatat absensi harian pengguna.
- **Fitur**:
  - Jam digital secara _real-time_.
  - Menangkap foto langsung menggunakan _webcam/kamera_ perangkat **ATAU** mengunggah file foto dari perangkat.
  - Memastikan user hanya dapat absen satu kali dalam sehari. Jika sudah absen, form tidak bisa digunakan lagi di hari itu.

### 3. Halaman Master Data (`/admin/master-data`)

- **Fungsi**: Halaman kontrol Admin untuk mengelola data akun pegawai di sistem.
- **Fitur**:
  - Menampilkan daftar Karyawan dan Admin dalam bentuk tabel rapi.
  - **Pencarian Nama (Search)**: Pencarian yang tidak membebani server berkat fitur _debounce_ 1 detik.
  - **Manajemen Akun (CRUD)**: Menambah, mengubah tipe akses (Admin/Employee), dan menghapus data karyawan.
  - **Pagination**: Navigasi halaman tabel dengan opsi tampilkan 10, 20, atau 50 data.

### 4. Halaman Monitoring (`/admin/monitoring`)

- **Fungsi**: Dasbor Admin untuk memantau rekam jejak absensi seluruh karyawan setiap harinya.
- **Fitur**:
  - Menampilkan riwayat waktu masuk dan status kehadiran (_In Time_, _Late_, _Alfa_).
  - **Filter Dinamis**: Mampu menyaring data hanya dengan **Tanggal**, hanya dengan **Status**, atau menggunakan keduanya sekaligus.
  - Tombol **Reset** untuk membersihkan filter dan kembali menampilkan semua data.
  - Tombol **Lihat Foto** untuk memunculkan gambar bukti foto check-in pengguna di atas tabel (_modal popup_).
  - **Pagination** otomatis untuk pengelolaan data skala besar.

---

## 🔑 Akun _Dummy_ Bawaan

Anda bisa menggunakan data awal berikut untuk mencoba (login):

- **Akun Admin** -> NIP: `10001` | Password: `admin123`
- **Akun Karyawan** -> NIP: `10002` (sampai `10011`) | Password: `password`
