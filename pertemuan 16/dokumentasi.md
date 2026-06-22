# Dokumentasi Aplikasi SIAKAD (CRUD dengan AJAX & Bootstrap)

## 1. Pendahuluan
Aplikasi ini merupakan sistem informasi akademik (SIAKAD) sederhana yang diimplementasikan menggunakan PHP Native, MySQL, JavaScript (Fetch API), dan Bootstrap 5. 
Tujuan dari aplikasi ini adalah untuk mengelola data master yang terdiri dari:
- Mahasiswa
- Dosen
- Mata Kuliah
- Jadwal Kuliah

Sistem ini bersifat Single Page Application (SPA) parsial per entitas, di mana setiap operasi CRUD (Create, Read, Update, Delete) dilakukan tanpa memuat ulang (*reload*) halaman berkat teknologi AJAX.

## 2. Struktur Direktori dan File
Proyek ini dibangun dengan pemisahan *concern* antara backend (API) dan frontend (UI & State):

```text
pertemuan 16/
├── database.sql         # Skema struktur database dan relasi antar tabel
├── koneksi.php          # Skrip koneksi dari PHP ke server MySQL
├── login.php            # Antarmuka dan logika validasi login
├── logout.php           # Logika untuk menghancurkan sesi dan keluar dari sistem
├── api.php              # RESTful API Backend terpusat untuk semua entitas
├── navbar.php           # Komponen navigasi umum (Shared UI)
├── index.php            # Antarmuka Dashboard (CRUD Data Mahasiswa)
├── script_mahasiswa.js  # Skrip AJAX spesifik untuk entitas mahasiswa
├── dosen.php            # Antarmuka CRUD Data Dosen
├── script_dosen.js      # Skrip AJAX spesifik untuk entitas dosen
├── matkul.php           # Antarmuka CRUD Data Mata Kuliah
├── script_matkul.js     # Skrip AJAX spesifik untuk entitas mata kuliah
├── jadwal.php           # Antarmuka CRUD Data Jadwal
└── script_jadwal.js     # Skrip AJAX spesifik untuk entitas jadwal
```

## 3. Penjelasan Logika Kode Utama

### 3.1 Backend Terpusat (`api.php`)
Sistem menggunakan satu file `api.php` sebagai *controller* utama yang menerima *request* AJAX dari seluruh halaman frontend. Konsep ini membuat kode backend sangat terpusat (DRY - Don't Repeat Yourself).

`api.php` dikendalikan melalui parameter `$_GET['action']` (seperti `list`, `get_single`, `save`, `delete`) dan parameter `$_GET['entity']` (seperti `mahasiswa`, `dosen`, `matkul`, `jadwal`).

**Contoh snippet penanganan relasi pada Jadwal di `api.php`**:
```php
if ($action == 'list') {
    if ($entity == 'jadwal') {
        // Melakukan LEFT JOIN untuk menarik data nama dosen dan nama matkul 
        // dari foreign key yang tersimpan (id_dosen, id_matkul)
        $query = mysqli_query($conn, "SELECT jadwal.*, dosen.nama as nama_dosen, matkul.matkul as nama_matkul FROM jadwal LEFT JOIN dosen ON jadwal.id_dosen = dosen.id LEFT JOIN matkul ON jadwal.id_matkul = matkul.id ORDER BY jadwal.id DESC");
    } else {
        $query = mysqli_query($conn, "SELECT * FROM $entity ORDER BY id DESC");
    }
    // ... encode response ke format JSON
}
```

### 3.2 Frontend Dinamis dengan Bootstrap Modal
Pada setiap antarmuka (contoh `dosen.php`), digunakan form di dalam **Bootstrap Modal**. Halaman tidak akan berpindah ketika pengguna mengklik "Tambah" atau "Edit". 

**Alur Tambah Data**:
1. User klik "Tambah", fungsi JavaScript `siapkanTambah()` mereset isi form modal dan mengosongkan *hidden input* `id`.
2. Modal Bootstrap muncul.

**Alur Edit Data**:
1. User klik "Edit", fungsi `siapkanEdit(id)` mengirim `fetch()` berjenis *GET* ke `api.php?action=get_single&id=[id]`.
2. Setelah data JSON diterima, JavaScript mengisi kolom form termasuk *hidden input* `id` dengan ID baris yang bersangkutan, kemudian modal ditampilkan.

### 3.3 JavaScript Fetch API (AJAX)
Penggunaan modern `fetch()` API menggantikan XMLHttpRequest konvensional (jQuery AJAX) untuk mengirim data tanpa *reload*.

Contoh saat menyimpan data:
```javascript
function simpanData(event) {
    event.preventDefault(); // Mencegah reload halaman bawaan browser
    const form = document.getElementById('formEntity');
    const formData = new FormData(form);

    fetch(`api.php?action=save&entity=${entity}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'success') {
            mModal.hide(); // Menutup modal
            loadData();    // Me-render ulang tabel secara dinamis
        }
    });
}
```

## 4. Kesimpulan
Aplikasi berhasil mengimplementasikan instruksi *best practice* dalam PHP berbasis *single-responsibility* pada file API, serta menyajikan antarmuka responsif yang dimuat secara asinkron dengan Javascript murni.
