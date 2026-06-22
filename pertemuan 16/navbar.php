<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
        <a class="navbar-brand" href="index.php">SIAKAD Universitas</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link" href="index.php">Mahasiswa</a></li>
                <li class="nav-item"><a class="nav-link" href="dosen.php">Dosen</a></li>
                <li class="nav-item"><a class="nav-link" href="matkul.php">Mata Kuliah</a></li>
                <li class="nav-item"><a class="nav-link" href="jadwal.php">Jadwal</a></li>
            </ul>
        </div>
        <div class="d-flex align-items-center">
            <span class="text-white me-3">Halo, <strong><?= htmlspecialchars($_SESSION['username'] ?? ''); ?></strong></span>
            <a href="logout.php" class="btn btn-danger btn-sm" onclick="return confirm('Apakah Anda yakin ingin keluar?')">Logout</a>
        </div>
    </div>
</nav>
