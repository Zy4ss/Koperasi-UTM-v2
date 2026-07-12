<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produk;

class ProdukTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = [
            [
                'nama' => 'Indomie Goreng',
                'harga' => 3500,
                'tag' => 'Best Seller',
                'kategori' => 'Retail',
                'subkategori' => 'Makanan',
                'gambar' => 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&q=80',
                'deskripsi' => 'Indomie Goreng rasa original, mie instan favorit semua kalangan. Cocok untuk menemani aktivitas kuliah.'
            ],
            [
                'nama' => 'Kopiko 78°C',
                'harga' => 5000,
                'tag' => 'Best Seller',
                'kategori' => 'Retail',
                'subkategori' => 'Minuman',
                'gambar' => 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80',
                'deskripsi' => 'Kopi kemasan dengan rasa yang nikmat dan menyegarkan. Praktis dibawa ke kampus.'
            ],
            [
                'nama' => 'Aqua 600ml',
                'harga' => 3000,
                'tag' => '',
                'kategori' => 'Retail',
                'subkategori' => 'Minuman',
                'gambar' => 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&q=80',
                'deskripsi' => 'Air mineral berkualitas untuk kebutuhan hidrasi sehari-hari di lingkungan kampus.'
            ],
            [
                'nama' => 'Oreo Original',
                'harga' => 8000,
                'tag' => 'New',
                'kategori' => 'Retail',
                'subkategori' => 'Makanan',
                'gambar' => 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
                'deskripsi' => 'Biskuit dengan krim vanilla yang lezat. Camilan favorit saat belajar atau nongkrong.'
            ],
            [
                'nama' => 'Good Day Cappuccino',
                'harga' => 4500,
                'tag' => '',
                'kategori' => 'Retail',
                'subkategori' => 'Minuman',
                'gambar' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80',
                'deskripsi' => 'Kopi cappuccino instan dengan rasa creamy dan aroma yang menggoda.'
            ],
            [
                'nama' => 'Keripik Singkong Pedas',
                'harga' => 10000,
                'tag' => 'Best Seller',
                'kategori' => 'Konsinyasi',
                'subkategori' => '',
                'gambar' => 'https://images.unsplash.com/photo-1566478989037-eec170784d6b?w=300&q=80',
                'deskripsi' => 'Keripik singkong produksi UMKM lokal dengan bumbu pedas yang menggugah selera.'
            ],
            [
                'nama' => 'Madu Murni 250ml',
                'harga' => 45000,
                'tag' => 'Promo',
                'kategori' => 'Konsinyasi',
                'subkategori' => '',
                'gambar' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80',
                'deskripsi' => 'Madu murni dari peternak lebah Madura. Kaya manfaat untuk kesehatan.'
            ],
            [
                'nama' => 'Buku Tulis Sidu 42 Lembar',
                'harga' => 5000,
                'tag' => '',
                'kategori' => 'Lainnya',
                'subkategori' => '',
                'gambar' => 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80',
                'deskripsi' => 'Buku tulis berkualitas untuk mencatat materi kuliah dan tugas sehari-hari.'
            ],
            [
                'nama' => 'Pulpen Standard AE7',
                'harga' => 3000,
                'tag' => '',
                'kategori' => 'Lainnya',
                'subkategori' => '',
                'gambar' => 'https://images.unsplash.com/photo-1583485088059-9f1a5f3d44f3?w=300&q=80',
                'deskripsi' => 'Pulpen standar dengan tinta hitam yang halus dan tidak mudah luntur.'
            ],
            [
                'nama' => 'Pocari Sweat 500ml',
                'harga' => 6500,
                'tag' => 'Promo',
                'kategori' => 'Retail',
                'subkategori' => 'Minuman',
                'gambar' => 'https://images.unsplash.com/photo-1580933073521-dc49ac0d5e95?w=300&q=80',
                'deskripsi' => 'Minuman isotonik untuk mengembalikan kesegaran setelah beraktivitas.'
            ],
            [
                'nama' => 'Tempat Pensil Kanvas',
                'harga' => 15000,
                'tag' => 'New',
                'kategori' => 'Lainnya',
                'subkategori' => '',
                'gambar' => 'https://images.unsplash.com/photo-1581686671838-20b599b24c7e?w=300&q=80',
                'deskripsi' => 'Tempat pensil berbahan kanvas yang kokoh dan stylish untuk kebutuhan kuliah.'
            ],
            [
                'nama' => 'Stik Keju Renyah',
                'harga' => 12000,
                'tag' => '',
                'kategori' => 'Konsinyasi',
                'subkategori' => '',
                'gambar' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
                'deskripsi' => 'Stik keju renyah produksi UMKM lokal, camilan gurih yang sulit berhenti dimakan.'
            ]
        ];

        foreach ($products as $prod) {
            Produk::updateOrCreate(
                ['nama' => $prod['nama']],
                [
                    'harga' => $prod['harga'],
                    'tag' => $prod['tag'],
                    'kategori' => $prod['kategori'],
                    'subkategori' => $prod['subkategori'],
                    'gambar' => $prod['gambar'],
                    'deskripsi' => $prod['deskripsi'],
                    'arsip' => false
                ]
            );
        }
    }
}
