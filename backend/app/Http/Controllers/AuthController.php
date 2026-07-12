<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->input('username'))->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            $token = bin2hex(random_bytes(30));
            $user->update(['api_token' => $token]);

            return response()->json([
                'status' => 'success',
                'username' => $user->username,
                'api_token' => $token,
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Username atau password salah',
        ], 401);
    }
}
