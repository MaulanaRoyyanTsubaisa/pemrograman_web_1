CREATE DATABASE IF NOT EXISTS db_mahasiswa;
USE db_mahasiswa;

-- 1. Membuat Tabel Pengguna (Login)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 2. Membuat Tabel Mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- 3. Membuat Tabel Dosen
CREATE TABLE IF NOT EXISTS dosen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL
);

-- 4. Membuat Tabel Matkul
CREATE TABLE IF NOT EXISTS matkul (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matkul VARCHAR(100) NOT NULL,
    sks INT NOT NULL
);

-- 5. Membuat Tabel Jadwal
CREATE TABLE IF NOT EXISTS jadwal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dosen INT NOT NULL,
    id_matkul INT NOT NULL,
    waktu VARCHAR(50) NOT NULL,
    ruang VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_dosen) REFERENCES dosen(id) ON DELETE CASCADE,
    FOREIGN KEY (id_matkul) REFERENCES matkul(id) ON DELETE CASCADE
);

-- 6. Memasukkan Akun Admin Default (Username: admin, Password: admin123)
INSERT INTO users (username, password) VALUES
('admin', '$2y$10$8v8zN6rW1bVd6gGf7Y2y8uV1mO9wF7tE3M8R8f3K5l7o9p0q1r2s3');
