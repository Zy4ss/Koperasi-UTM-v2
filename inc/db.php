<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'koperasi_utm';

$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
  http_response_code(500);
  die(json_encode(['error' => 'Koneksi database gagal: ' . $conn->connect_error]));
}

$conn->query("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$conn->select_db($dbname);
$conn->set_charset('utf8mb4');

function res($data, $code = 200) {
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data);
  exit;
}
