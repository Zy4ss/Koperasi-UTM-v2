<?php
require_once __DIR__ . '/../inc/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $result = $conn->query("SELECT * FROM kategori ORDER BY id ASC");
  $data = [];
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  res($data);
}

if ($method === 'POST') {
  $action = $_POST['action'] ?? '';

  if ($action === 'create') {
    $nama = $_POST['nama'] ?? '';
    $tipe = $_POST['tipe'] ?? 'utama';
    if (!$nama) res(['error' => 'Nama kategori harus diisi'], 400);
    $stmt = $conn->prepare("INSERT INTO kategori (nama, tipe) VALUES (?, ?)");
    $stmt->bind_param("ss", $nama, $tipe);
    $stmt->execute();
    res(['id' => $stmt->insert_id, 'message' => 'Kategori berhasil ditambahkan'], 201);
  }

  if ($action === 'update') {
    $id = intval($_POST['id'] ?? 0);
    $nama = $_POST['nama'] ?? '';
    $tipe = $_POST['tipe'] ?? 'utama';
    if (!$id || !$nama) res(['error' => 'Data tidak lengkap'], 400);
    $stmt = $conn->prepare("UPDATE kategori SET nama=?, tipe=? WHERE id=?");
    $stmt->bind_param("ssi", $nama, $tipe, $id);
    $stmt->execute();
    res(['message' => 'Kategori berhasil diperbarui']);
  }

  if ($action === 'delete') {
    $id = intval($_POST['id'] ?? 0);
    if (!$id) res(['error' => 'ID tidak valid'], 400);
    $stmt = $conn->prepare("DELETE FROM kategori WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    res(['message' => 'Kategori berhasil dihapus']);
  }

  res(['error' => 'Aksi tidak dikenal'], 400);
}
