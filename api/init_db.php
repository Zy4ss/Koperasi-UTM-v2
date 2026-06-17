<?php
require_once __DIR__ . '/../inc/db.php';

$conn->query("CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$result = $conn->query("SELECT COUNT(*) AS cnt FROM users");
$row = $result->fetch_assoc();
if ($row['cnt'] == 0) {
  $hash = password_hash('kopma123', PASSWORD_DEFAULT);
  $conn->query("INSERT INTO `users` (`username`, `password`) VALUES ('admin', '$hash')");
}

$conn->query("CREATE TABLE IF NOT EXISTS `kategori` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(100) NOT NULL,
  `tipe` ENUM('utama','sub') NOT NULL DEFAULT 'utama',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$conn->query("CREATE TABLE IF NOT EXISTS `produk` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(200) NOT NULL,
  `harga` INT NOT NULL,
  `tag` VARCHAR(50) NOT NULL DEFAULT '',
  `kategori` VARCHAR(100) NOT NULL,
  `subkategori` VARCHAR(100) DEFAULT '',
  `gambar` VARCHAR(500) DEFAULT NULL,
  `deskripsi` TEXT,
  `arsip` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$result = $conn->query("SELECT COUNT(*) AS cnt FROM kategori");
$row = $result->fetch_assoc();

if ($row['cnt'] == 0) {
  $conn->query("INSERT INTO `kategori` (`nama`, `tipe`) VALUES
    ('Retail', 'utama'),
    ('Makanan', 'sub'),
    ('Minuman', 'sub'),
    ('Konsinyasi', 'utama'),
    ('Lainnya', 'utama')");
}

$result = $conn->query("SELECT COUNT(*) AS cnt FROM produk");
$row = $result->fetch_assoc();

if ($row['cnt'] == 0) {
  $conn->query("INSERT INTO `produk` (`nama`, `harga`, `tag`, `kategori`, `subkategori`, `gambar`, `deskripsi`) VALUES
    ('Indomie Goreng', 3500, 'Best Seller', 'Retail', 'Makanan', 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&q=80', 'Indomie Goreng rasa original, mie instan favorit semua kalangan. Cocok untuk menemani aktivitas kuliah.'),
    ('Kopiko 78°C', 5000, 'Best Seller', 'Retail', 'Minuman', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80', 'Kopi kemasan dengan rasa yang nikmat dan menyegarkan. Praktis dibawa ke kampus.'),
    ('Aqua 600ml', 3000, '', 'Retail', 'Minuman', 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&q=80', 'Air mineral berkualitas untuk kebutuhan hidrasi sehari-hari di lingkungan kampus.'),
    ('Oreo Original', 8000, 'New', 'Retail', 'Makanan', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80', 'Biskuit dengan krim vanilla yang lezat. Camilan favorit saat belajar atau nongkrong.'),
    ('Good Day Cappuccino', 4500, '', 'Retail', 'Minuman', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80', 'Kopi cappuccino instan dengan rasa creamy dan aroma yang menggoda.'),
    ('Keripik Singkong Pedas', 10000, 'Best Seller', 'Konsinyasi', '', 'https://images.unsplash.com/photo-1566478989037-eec170784d6b?w=300&q=80', 'Keripik singkong produksi UMKM lokal dengan bumbu pedas yang menggugah selera.'),
    ('Madu Murni 250ml', 45000, 'Promo', 'Konsinyasi', '', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80', 'Madu murni dari peternak lebah Madura. Kaya manfaat untuk kesehatan.'),
    ('Buku Tulis Sidu 42 Lembar', 5000, '', 'Lainnya', '', 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80', 'Buku tulis berkualitas untuk mencatat materi kuliah dan tugas sehari-hari.'),
    ('Pulpen Standard AE7', 3000, '', 'Lainnya', '', 'https://images.unsplash.com/photo-1583485088059-9f1a5f3d44f3?w=300&q=80', 'Pulpen standar dengan tinta hitam yang halus dan tidak mudah luntur.'),
    ('Pocari Sweat 500ml', 6500, 'Promo', 'Retail', 'Minuman', 'https://images.unsplash.com/photo-1580933073521-dc49ac0d5e95?w=300&q=80', 'Minuman isotonik untuk mengembalikan kesegaran setelah beraktivitas.'),
    ('Tempat Pensil Kanvas', 15000, 'New', 'Lainnya', '', 'https://images.unsplash.com/photo-1581686671838-20b599b24c7e?w=300&q=80', 'Tempat pensil berbahan kanvas yang kokoh dan stylish untuk kebutuhan kuliah.'),
    ('Stik Keju Renyah', 12000, '', 'Konsinyasi', '', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80', 'Stik keju renyah produksi UMKM lokal, camilan gurih yang sulit berhenti dimakan.')
  ");
}

echo json_encode(['status' => 'ok', 'message' => 'Database dan tabel berhasil dibuat']);
