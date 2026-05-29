// ==============================
// KALKULATOR HTML CSS JS
// ==============================

function hitung(operasi) {
    let angka1 = Number(document.getElementById("angka1").value);
    let angka2 = Number(document.getElementById("angka2").value);
    let hasil = 0;

    if (document.getElementById("angka1").value === "" || document.getElementById("angka2").value === "") {
        alert("Harap isi kedua angka terlebih dahulu!");
        return;
    }

    if (operasi === "tambah") {
        hasil = angka1 + angka2;
    } else if (operasi === "kurang") {
        hasil = angka1 - angka2;
    } else if (operasi === "kali") {
        hasil = angka1 * angka2;
    } else if (operasi === "bagi") {
        if (angka2 === 0) {
            alert("Angka tidak bisa dibagi dengan 0!");
            return;
        }
        hasil = angka1 / angka2;
    } else {
        hasil = "Operasi tidak valid";
    }

    document.getElementById("hasil").innerHTML = hasil;
}

function resetForm() {
    document.getElementById("angka1").value = "";
    document.getElementById("angka2").value = "";
    document.getElementById("hasil").innerHTML = "0";
}


// ==============================
// TUGAS 1: IF ELSE LEBIH KOMPLEKS
// Studi kasus: menentukan kelulusan mahasiswa
// ==============================

let nilai = 85;
let kehadiran = 80;

if (nilai >= 75 && kehadiran >= 75) {
    document.getElementById("statusNilai").innerHTML =
        "Nilai: " + nilai + ", Kehadiran: " + kehadiran + "%. Status: Lulus.";
} else if (nilai >= 75 && kehadiran < 75) {
    document.getElementById("statusNilai").innerHTML =
        "Nilai cukup, tetapi kehadiran kurang. Status: Tidak Lulus.";
} else {
    document.getElementById("statusNilai").innerHTML =
        "Nilai belum mencukupi. Status: Tidak Lulus.";
}


// ==============================
// TUGAS 2: FUNCTION LEBIH KOMPLEKS
// Contoh 1: Menghitung luas persegi panjang
// ==============================

function luasPersegiPanjang(panjang, lebar) {
    let luas = panjang * lebar;
    return luas;
}

let hasilLuas = luasPersegiPanjang(10, 5);
document.getElementById("luas").innerHTML =
    "Luas Persegi Panjang: 10 × 5 = " + hasilLuas;


// ==============================
// TUGAS 2: FUNCTION LEBIH KOMPLEKS
// Contoh 2: Menghitung nilai akhir mahasiswa
// ==============================

function hitungNilaiAkhir(tugas, uts, uas) {
    let nilaiAkhir = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
    return nilaiAkhir;
}

let akhir = hitungNilaiAkhir(90, 80, 85);
document.getElementById("nilaiAkhir").innerHTML =
    "Nilai Akhir Mahasiswa: " + akhir;
