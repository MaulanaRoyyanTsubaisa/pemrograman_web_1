function hitungBelanja() {
  let harga = Number(document.getElementById("harga").value);
  let jumlah = Number(document.getElementById("jumlah").value);
  let diskonPersen = Number(document.getElementById("diskon").value);

  // Operator aritmatik
  let total = harga * jumlah;
  let diskon = 0;
  let bayar = total;

  // Operator penugasan
  let poin = 0;
  poin += 10;

  let status = "";

  // Operator pembanding
  if (total >= 100000 && diskonPersen > 0) {
    diskon = total * (diskonPersen / 100);
    bayar = total - diskon;
    status = `Anda mendapatkan diskon ${diskonPersen}%`;
  } else if (total >= 100000) {
    status = "Anda mendapatkan diskon, tapi persentase diskon tidak diisi";
  } else {
    status = "Belum mendapatkan diskon";
  }

  // Output JavaScript
  document.getElementById("hasil").innerHTML = `
    <h3>Hasil Perhitungan</h3>
    <p>Total Belanja: Rp ${total}</p>
    <p>Persentase Diskon: ${diskonPersen}%</p>
    <p>Jumlah Diskon: Rp ${diskon.toFixed(0)}</p>
    <p>Total Bayar: Rp ${bayar.toFixed(0)}</p>
    <p>Poin Belanja: ${poin}</p>
    <p>Status: ${status}</p>
  `;
}
