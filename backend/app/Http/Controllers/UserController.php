<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'username' => $request->input('username'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Admin berhasil ditambahkan',
            'data' => $user
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User tidak ditemukan'], 404);
        }

        $this->validate($request, [
            'username' => 'required|string|unique:users,username,' . $id,
            'password' => 'nullable|string|min:6',
        ]);

        $data = ['username' => $request->input('username')];
        
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->input('password'));
        }

        $user->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Admin berhasil diupdate',
            'data' => $user
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User tidak ditemukan'], 404);
        }

        // Prevent deleting the last admin
        if (User::count() <= 1) {
            return response()->json(['error' => 'Tidak dapat menghapus admin terakhir'], 400);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Admin berhasil dihapus'
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $this->validate($request, [
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:users,id',
        ]);

        $ids = $request->input('ids');
        
        // Prevent deleting all users (always keep at least 1 admin)
        $totalUsers = User::count();
        if ($totalUsers - count($ids) <= 0) {
            return response()->json([
                'error' => 'Tidak dapat menghapus semua admin. Harus ada minimal 1 admin.'
            ], 400);
        }

        User::whereIn('id', $ids)->delete();

        return response()->json([
            'message' => 'Admin terpilih berhasil dihapus',
        ]);
    }
}
