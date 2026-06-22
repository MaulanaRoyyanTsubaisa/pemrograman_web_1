<?php
session_start();
if (!isset($_SESSION['login'])) {
    header("Location: login.php");
    exit;
}

include 'koneksi.php';

// Fetch dosen and matkul for dropdowns
$dosen_query = mysqli_query($conn, "SELECT id, nama FROM dosen");
$dosens = [];
while ($row = mysqli_fetch_assoc($dosen_query)) { $dosens[] = $row; }

$matkul_query = mysqli_query($conn, "SELECT id, matkul FROM matkul");
$matkuls = [];
while ($row = mysqli_fetch_assoc($matkul_query)) { $matkuls[] = $row; }
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jadwal Kuliah - SIAKAD</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <?php include 'navbar.php'; ?>

    <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Daftar Jadwal Kuliah</h2>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jadwalModal" onclick="siapkanTambah()">Tambah Jadwal</button>
        </div>

        <div class="card shadow-sm border-0">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover table-striped mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th class="ps-3">No</th>
                                <th>Dosen</th>
                                <th>Mata Kuliah</th>
                                <th>Waktu</th>
                                <th>Ruang</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="tempat-data">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Form -->
    <div class="modal fade" id="jadwalModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Form Jadwal Kuliah</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="formEntity" onsubmit="simpanData(event)">
                    <div class="modal-body">
                        <input type="hidden" id="id" name="id">
                        
                        <div class="mb-3">
                            <label for="id_dosen" class="form-label">Dosen</label>
                            <select class="form-select" id="id_dosen" name="id_dosen" required>
                                <option value="">Pilih Dosen</option>
                                <?php foreach($dosens as $d) : ?>
                                    <option value="<?= $d['id'] ?>"><?= htmlspecialchars($d['nama']) ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="id_matkul" class="form-label">Mata Kuliah</label>
                            <select class="form-select" id="id_matkul" name="id_matkul" required>
                                <option value="">Pilih Mata Kuliah</option>
                                <?php foreach($matkuls as $m) : ?>
                                    <option value="<?= $m['id'] ?>"><?= htmlspecialchars($m['matkul']) ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="waktu" class="form-label">Waktu</label>
                            <input type="text" class="form-control" id="waktu" name="waktu" placeholder="Contoh: Senin, 08:00 - 10:30" required autocomplete="off">
                        </div>
                        
                        <div class="mb-3">
                            <label for="ruang" class="form-label">Ruang</label>
                            <input type="text" class="form-control" id="ruang" name="ruang" required autocomplete="off">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                        <button type="submit" class="btn btn-primary">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script_jadwal.js"></script>
</body>
</html>
