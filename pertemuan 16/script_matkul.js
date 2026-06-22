document.addEventListener('DOMContentLoaded', loadData);

const mModal = new bootstrap.Modal(document.getElementById('matkulModal'));
const entity = 'matkul';

function loadData() {
    fetch(`api.php?action=list&entity=${entity}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            if (data.length === 0) {
                html = `<tr><td colspan="4" class="text-center text-muted p-4">Belum ada data ${entity}.</td></tr>`;
            } else {
                data.forEach((item, index) => {
                    html += `
                        <tr>
                            <td class="ps-3 align-middle">${index + 1}</td>
                            <td class="align-middle">${item.matkul}</td>
                            <td class="align-middle">${item.sks}</td>
                            <td class="text-center align-middle">
                                <button class="btn btn-warning btn-sm me-1" onclick="siapkanEdit(${item.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="hapusData(${item.id})">Hapus</button>
                            </td>
                        </tr>
                    `;
                });
            }
            document.getElementById('tempat-data').innerHTML = html;
        })
        .catch(err => console.error("Gagal memuat data: ", err));
}

function siapkanTambah() {
    document.getElementById('modalTitle').innerText = 'Tambah Data Mata Kuliah';
    document.getElementById('formEntity').reset();
    document.getElementById('id').value = '';
}

function siapkanEdit(id) {
    document.getElementById('modalTitle').innerText = 'Ubah Data Mata Kuliah';
    document.getElementById('formEntity').reset();

    fetch(`api.php?action=get_single&entity=${entity}&id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id').value = data.id;
            document.getElementById('matkul').value = data.matkul;
            document.getElementById('sks').value = data.sks;
            mModal.show();
        })
        .catch(err => console.error("Gagal mengambil data detail: ", err));
}

function simpanData(event) {
    event.preventDefault();
    const form = document.getElementById('formEntity');
    const formData = new FormData(form);

    fetch(`api.php?action=save&entity=${entity}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'success') {
            alert('Data berhasil disimpan!');
            mModal.hide();
            loadData();
        } else {
            alert('Error: ' + res.message);
        }
    })
    .catch(err => console.error("Gagal mengirim data: ", err));
}

function hapusData(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini secara permanen?')) {
        const formData = new FormData();
        formData.append('id', id);
        
        fetch(`api.php?action=delete&entity=${entity}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                alert('Data berhasil dihapus!');
                loadData();
            } else {
                alert('Error: ' + res.message);
            }
        })
        .catch(err => console.error("Gagal menghapus data: ", err));
    }
}
