<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pengurus;

class PengurusTableSeeder extends Seeder
{
    public function run()
    {
        // Level 1 — Ketua
        Pengurus::create([
            'nama' => 'Faidal',
            'jabatan' => 'Ketua',
            'foto' => 'img/pengurus/FAIDAL.jpeg',
            'level' => 1,
            'urutan' => 0,
        ]);

        // Level 2 — BPH
        Pengurus::create([
            'nama' => 'Trimulyani Budianingsih',
            'jabatan' => 'Bendahara',
            'foto' => 'img/pengurus/TRIMULYANI BUDIANINGSIH.jpeg',
            'level' => 2,
            'urutan' => 0,
        ]);

        Pengurus::create([
            'nama' => 'R Ayu Fauziyah Fierdaus',
            'jabatan' => 'Sekretaris',
            'foto' => 'img/pengurus/R AYU FAUZIYAH FIERDAUS.jpeg',
            'level' => 2,
            'urutan' => 1,
        ]);

        Pengurus::create([
            'nama' => 'R Sri Kentjanawati',
            'jabatan' => 'Pengawas',
            'foto' => 'img/pengurus/R SRI KENTJANAWATI.jpeg',
            'level' => 2,
            'urutan' => 2,
        ]);

        // Level 3 — Sie
        Pengurus::create([
            'nama' => 'Moh. Ajib',
            'jabatan' => 'Sie Perlengkapan',
            'foto' => 'img/pengurus/MOH AJIB.jpeg',
            'level' => 3,
            'urutan' => 0,
        ]);

        Pengurus::create([
            'nama' => 'Abd. Halim',
            'jabatan' => 'Sie Usaha',
            'foto' => 'img/pengurus/ABD HALIM.jpeg',
            'level' => 3,
            'urutan' => 1,
        ]);

        Pengurus::create([
            'nama' => 'Anisah',
            'jabatan' => 'Sie Usaha',
            'foto' => 'img/pengurus/ANISAH.jpeg',
            'level' => 3,
            'urutan' => 2,
        ]);
    }
}
