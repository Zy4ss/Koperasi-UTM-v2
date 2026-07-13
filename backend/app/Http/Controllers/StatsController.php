<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Kategori;

class StatsController extends Controller
{
    public function index()
    {
        $totalProduk = Produk::count();
        $totalKategori = Kategori::count();
        $arsipCount = Produk::where('arsip', true)->count();
        
        $semuaKategori = Kategori::where('tipe', 'utama')->pluck('nama');
        $komposisiKategori = [];
        foreach ($semuaKategori as $katName) {
            $komposisiKategori[] = [
                'name' => $katName,
                'value' => Produk::where('kategori', $katName)->count()
            ];
        }
        
        $produkTerbaru = Produk::orderBy('id', 'desc')->limit(5)->get();

        return response()->json([
            'totalProduk' => $totalProduk,
            'totalKategori' => $totalKategori,
            'arsipCount' => $arsipCount,
            'komposisiKategori' => $komposisiKategori,
            'produkTerbaru' => $produkTerbaru
        ]);
    }
}
