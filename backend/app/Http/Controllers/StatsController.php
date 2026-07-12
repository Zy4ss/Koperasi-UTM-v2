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
        $retailCount = Produk::where('kategori', 'Retail')->count();
        $konsinyasiCount = Produk::where('kategori', 'Konsinyasi')->count();
        $arsipCount = Produk::where('arsip', true)->count();
        
        $produkTerbaru = Produk::orderBy('id', 'desc')->limit(5)->get();

        return response()->json([
            'totalProduk' => $totalProduk,
            'totalKategori' => $totalKategori,
            'retailCount' => $retailCount,
            'konsinyasiCount' => $konsinyasiCount,
            'arsipCount' => $arsipCount,
            'produkTerbaru' => $produkTerbaru
        ]);
    }
}
