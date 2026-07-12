<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kategori;

class KategoriTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['nama' => 'Retail', 'tipe' => 'utama'],
            ['nama' => 'Makanan', 'tipe' => 'sub'],
            ['nama' => 'Minuman', 'tipe' => 'sub'],
            ['nama' => 'Konsinyasi', 'tipe' => 'utama'],
            ['nama' => 'Lainnya', 'tipe' => 'utama']
        ];

        foreach ($categories as $cat) {
            Kategori::updateOrCreate(
                ['nama' => $cat['nama']],
                ['tipe' => $cat['tipe']]
            );
        }
    }
}
