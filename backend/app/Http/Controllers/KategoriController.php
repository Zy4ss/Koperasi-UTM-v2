<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategori;

class KategoriController extends Controller
{
    public function index()
    {
        $kategori = Kategori::orderBy('id', 'asc')->get();
        return response()->json($kategori);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nama' => 'required|string|max:100',
            'tipe' => 'required|in:utama,sub',
        ]);

        $kategori = Kategori::create([
            'nama' => $request->input('nama'),
            'tipe' => $request->input('tipe'),
        ]);

        return response()->json([
            'id' => $kategori->id,
            'message' => 'Kategori berhasil ditambahkan',
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json(['error' => 'Kategori tidak ditemukan'], 404);
        }

        $this->validate($request, [
            'nama' => 'required|string|max:100',
            'tipe' => 'required|in:utama,sub',
        ]);

        $kategori->update([
            'nama' => $request->input('nama'),
            'tipe' => $request->input('tipe'),
        ]);

        return response()->json(['message' => 'Kategori berhasil diperbarui']);
    }

    public function destroy($id)
    {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json(['error' => 'Kategori tidak ditemukan'], 404);
        }

        $kategori->delete();

        return response()->json(['message' => 'Kategori berhasil dihapus']);
    }

    public function bulkDestroy(Request $request)
    {
        $this->validate($request, [
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:kategoris,id',
        ]);

        Kategori::whereIn('id', $request->input('ids'))->delete();

        return response()->json([
            'message' => 'Kategori terpilih berhasil dihapus',
        ]);
    }
}
