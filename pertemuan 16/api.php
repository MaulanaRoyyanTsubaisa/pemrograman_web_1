<?php
session_start();
header('Content-Type: application/json');

// Proteksi API: Jika tidak ada session login, cegah akses
if (!isset($_SESSION['login'])) {
    echo json_encode(['status' => 'error', 'message' => 'Akses ilegal terdeteksi. Silakan login.']);
    exit;
}

include 'koneksi.php';

$action = $_GET['action'] ?? '';
$entity = $_GET['entity'] ?? 'mahasiswa';

// Validasi entity
$allowed_entities = ['mahasiswa', 'dosen', 'matkul', 'jadwal'];
if (!in_array($entity, $allowed_entities)) {
    echo json_encode(['status' => 'error', 'message' => 'Entity tidak valid']);
    exit;
}

// ==========================================
// ACTION: READ (Mengambil Seluruh Data)
// ==========================================
if ($action == 'list') {
    if ($entity == 'jadwal') {
        $query = mysqli_query($conn, "SELECT jadwal.*, dosen.nama as nama_dosen, matkul.matkul as nama_matkul FROM jadwal LEFT JOIN dosen ON jadwal.id_dosen = dosen.id LEFT JOIN matkul ON jadwal.id_matkul = matkul.id ORDER BY jadwal.id DESC");
    } else {
        $query = mysqli_query($conn, "SELECT * FROM $entity ORDER BY id DESC");
    }
    
    $data = [];
    while ($row = mysqli_fetch_assoc($query)) {
        $data[] = $row;
    }
    echo json_encode($data);
    exit;
}

// ==========================================
// ACTION: GET SINGLE (Mengambil Satu Data untuk Form Edit)
// ==========================================
if ($action == 'get_single') {
    $id = intval($_GET['id']);
    $query = mysqli_query($conn, "SELECT * FROM $entity WHERE id = $id");
    $data = mysqli_fetch_assoc($query);
    echo json_encode($data);
    exit;
}

// ==========================================
// ACTION: CREATE & UPDATE (Menyimpan Data)
// ==========================================
if ($action == 'save') {
    $id = $_POST['id'] ?? '';
    
    if ($entity == 'mahasiswa') {
        $nim = mysqli_real_escape_string($conn, $_POST['nim']);
        $nama = mysqli_real_escape_string($conn, $_POST['nama']);
        $jurusan = mysqli_real_escape_string($conn, $_POST['jurusan']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        
        if (empty($id)) {
            $sql = "INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES ('$nim', '$nama', '$jurusan', '$email')";
        } else {
            $sql = "UPDATE mahasiswa SET nim='$nim', nama='$nama', jurusan='$jurusan', email='$email' WHERE id=$id";
        }
    } elseif ($entity == 'dosen') {
        $nama = mysqli_real_escape_string($conn, $_POST['nama']);
        $alamat = mysqli_real_escape_string($conn, $_POST['alamat']);
        
        if (empty($id)) {
            $sql = "INSERT INTO dosen (nama, alamat) VALUES ('$nama', '$alamat')";
        } else {
            $sql = "UPDATE dosen SET nama='$nama', alamat='$alamat' WHERE id=$id";
        }
    } elseif ($entity == 'matkul') {
        $matkul = mysqli_real_escape_string($conn, $_POST['matkul']);
        $sks = intval($_POST['sks']);
        
        if (empty($id)) {
            $sql = "INSERT INTO matkul (matkul, sks) VALUES ('$matkul', $sks)";
        } else {
            $sql = "UPDATE matkul SET matkul='$matkul', sks=$sks WHERE id=$id";
        }
    } elseif ($entity == 'jadwal') {
        $id_dosen = intval($_POST['id_dosen']);
        $id_matkul = intval($_POST['id_matkul']);
        $waktu = mysqli_real_escape_string($conn, $_POST['waktu']);
        $ruang = mysqli_real_escape_string($conn, $_POST['ruang']);
        
        if (empty($id)) {
            $sql = "INSERT INTO jadwal (id_dosen, id_matkul, waktu, ruang) VALUES ($id_dosen, $id_matkul, '$waktu', '$ruang')";
        } else {
            $sql = "UPDATE jadwal SET id_dosen=$id_dosen, id_matkul=$id_matkul, waktu='$waktu', ruang='$ruang' WHERE id=$id";
        }
    }

    if (isset($sql) && mysqli_query($conn, $sql)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
    }
    exit;
}

// ==========================================
// ACTION: DELETE (Menghapus Data)
// ==========================================
if ($action == 'delete') {
    $id = intval($_POST['id']);
    $sql = "DELETE FROM $entity WHERE id = $id";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
    }
    exit;
}
?>
