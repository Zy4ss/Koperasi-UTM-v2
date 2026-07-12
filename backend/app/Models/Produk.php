<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $table = 'produk';

    protected $fillable = [
        'nama',
        'harga',
        'tag',
        'kategori',
        'subkategori',
        'gambar',
        'deskripsi',
        'arsip',
    ];

    protected $casts = [
        'harga' => 'integer',
        'arsip' => 'boolean',
    ];
}
