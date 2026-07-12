<?php
require_once __DIR__ . '/../inc/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $arsip = isset($_GET['arsip']) ? intval($_GET['arsip']) : null;
  $search = isset($_GET['search']) ? trim($_GET['search']) : '';
  $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : null;
  $perPage = isset($_GET['per_page']) ? max(1, intval($_GET['per_page'])) : 7;

  $conds = [];
  if ($arsip !== null) $conds[] = "arsip = $arsip";
  if ($search !== '') {
    $s = $conn->real_escape_string($search);
    $conds[] = "(nama LIKE '%$s%' OR kategori LIKE '%$s%' OR deskripsi LIKE '%$s%' OR tag LIKE '%$s%')";
  }

  $where = $conds ? " WHERE " . implode(' AND ', $conds) : "";

  $countResult = $conn->query("SELECT COUNT(*) AS total FROM produk$where");
  $total = $countResult->fetch_assoc()['total'];

  if ($search !== '') {
    $limit = "";
  } elseif ($page !== null) {
    $offset = ($page - 1) * $perPage;
    $limit = " LIMIT $perPage OFFSET $offset";
  } else {
    $limit = "";
  }

  $sql = "SELECT * FROM produk$where ORDER BY id DESC$limit";
  $result = $conn->query($sql);
  $data = [];
  while ($row = $result->fetch_assoc()) {
    $row['id'] = intval($row['id']);
    $row['harga'] = intval($row['harga']);
    $row['arsip'] = intval($row['arsip']);
    $data[] = $row;
  }

  if ($search !== '') {
    res(['data' => $data, 'total' => intval($total)]);
  } elseif ($page !== null) {
    res([
      'data' => $data,
      'total' => intval($total),
      'page' => $page,
      'per_page' => $perPage,
      'total_pages' => max(1, ceil($total / $perPage))
    ]);
  } else {
    res($data);
  }
}

if ($method === 'POST') {
  $action = $_POST['action'] ?? '';

  if ($action === 'create') {
    $nama = $_POST['nama'] ?? '';
    $harga = intval($_POST['harga'] ?? 0);
    $tag = $_POST['tag'] ?? '';
    $kategori = $_POST['kategori'] ?? '';
    $subkategori = $_POST['subkategori'] ?? '';
    $deskripsi = $_POST['deskripsi'] ?? '';

    if (!$nama) res(['error' => 'Nama produk harus diisi'], 400);

    $gambar = '';
    if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
      $ext = pathinfo($_FILES['gambar']['name'], PATHINFO_EXTENSION);
      $filename = uniqid() . '.' . $ext;
      $dest = __DIR__ . '/../upload/' . $filename;
      if (move_uploaded_file($_FILES['gambar']['tmp_name'], $dest)) {
        $gambar = 'upload/' . $filename;
      }
    }

    $stmt = $conn->prepare("INSERT INTO produk (nama, harga, tag, kategori, subkategori, gambar, deskripsi) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sisssss", $nama, $harga, $tag, $kategori, $subkategori, $gambar, $deskripsi);
    $stmt->execute();
    res(['id' => $stmt->insert_id, 'message' => 'Produk berhasil ditambahkan'], 201);
  }

  if ($action === 'update') {
    $id = intval($_POST['id'] ?? 0);
    $nama = $_POST['nama'] ?? '';
    $harga = intval($_POST['harga'] ?? 0);
    $tag = $_POST['tag'] ?? '';
    $kategori = $_POST['kategori'] ?? '';
    $subkategori = $_POST['subkategori'] ?? '';
    $deskripsi = $_POST['deskripsi'] ?? '';

    if (!$id || !$nama) res(['error' => 'Data tidak lengkap'], 400);

    $gambar = $_POST['gambar'] ?? null;
    if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
      $ext = pathinfo($_FILES['gambar']['name'], PATHINFO_EXTENSION);
      $filename = uniqid() . '.' . $ext;
      $dest = __DIR__ . '/../upload/' . $filename;
      if (move_uploaded_file($_FILES['gambar']['tmp_name'], $dest)) {
        $gambar = 'upload/' . $filename;
      }
    } elseif ($gambar === null) {
      $result = $conn->query("SELECT gambar FROM produk WHERE id=$id");
      $row = $result->fetch_assoc();
      $gambar = $row['gambar'] ?? '';
    }

    $stmt = $conn->prepare("UPDATE produk SET nama=?, harga=?, tag=?, kategori=?, subkategori=?, gambar=?, deskripsi=? WHERE id=?");
    $stmt->bind_param("sisssssi", $nama, $harga, $tag, $kategori, $subkategori, $gambar, $deskripsi, $id);
    $stmt->execute();
    res(['message' => 'Produk berhasil diperbarui']);
  }

  if ($action === 'delete') {
    $id = intval($_POST['id'] ?? 0);
    if (!$id) res(['error' => 'ID tidak valid'], 400);
    $stmt = $conn->prepare("DELETE FROM produk WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    res(['message' => 'Produk berhasil dihapus']);
  }

  if ($action === 'archive') {
    $id = intval($_POST['id'] ?? 0);
    $arsip = intval($_POST['arsip'] ?? 1);
    if (!$id) res(['error' => 'ID tidak valid'], 400);
    $stmt = $conn->prepare("UPDATE produk SET arsip=? WHERE id=?");
    $stmt->bind_param("ii", $arsip, $id);
    $stmt->execute();
    $label = $arsip ? 'diarsipkan' : 'dibuka dari arsip';
    res(['message' => "Produk berhasil $label"]);
  }

  res(['error' => 'Aksi tidak dikenal'], 400);
}
