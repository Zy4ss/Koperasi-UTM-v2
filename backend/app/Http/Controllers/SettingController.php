<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    // Default settings to fall back to if not present in the DB
    private $defaults = [
        'hero_title_accent' => 'Koperasi',
        'hero_title_sub' => 'Universitas Trunojoyo Madura',
        'hero_tagline' => 'Dari Anggota, Oleh Anggota, Untuk Anggota',
        'hero_desc' => 'Menyediakan berbagai kebutuhan mahasiswa dengan pelayanan yang mudah, cepat, dan terpercaya.',
        'about_tag' => 'Tentang Koperasi UTM',
        'about_title' => 'Koperasi Universitas Trunojoyo Madura',
        'about_desc' => 'Koperasi UTM adalah koperasi yang berorientasi pada pelayanan mahasiswa, mendukung ekonomi kreatif mahasiswa, dan menyediakan berbagai kebutuhan sehari-hari di lingkungan kampus. Sebagai wadah pengembangan ekonomi mahasiswa, Koperasi UTM berkomitmen untuk memberikan pelayanan terbaik dengan harga yang terjangkau dan produk yang berkualitas.',
        'about_year' => '1997',
        'about_badge_text' => 'Melayani Mahasiswa',
        'visi' => 'Koperasi UTM menjadi Koperasi Nasional.',
        'misi' => "Memberi Layanan, Menyediakan Produk, Jasa serta Kebutuhan Anggota.\nMembantu Menciptakan Peluang Usaha Bagi Anggota.\nMenjadi Organisasi yang Transparan dengan Good Corporate Governance.",
    ];

    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        
        // Merge defaults
        $merged = array_merge($this->defaults, $settings);
        
        return response()->json($merged);
    }

    public function updateBatch(Request $request)
    {
        $this->validate($request, [
            'settings' => 'required|array',
        ]);

        $settings = $request->input('settings');
        
        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return response()->json([
            'message' => 'Setelan berhasil diperbarui',
        ]);
    }
}
