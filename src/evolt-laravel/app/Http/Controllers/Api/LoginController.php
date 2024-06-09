<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'pin' => 'required|string',
        ]);

        $input = $request->only('username', 'pin');

        $user = User::with('role')
            ->where('username', $input['username'])
            ->where('pin', $input['pin'])
            ->first();

        if ($user) {
            if ($user['id_role'] == 3) {
                return response()->json(['message' => 'User Tidak Memiliki Akses'], 401);
            }
            return response()->json([
                'message' => 'Berhasil Login',
                'isLogin' => true,
                'idRole' => $user->id_role,
                'idUser' => $user->id_user,
            ], 200);
        } else {
            return response()->json(['message' => 'User Tidak Ditemukan'], 404);
        }
    }
    public function loginMobile(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'pin' => 'required|string',
        ]);

        $input = $request->only('username', 'pin');

        $user = User::with('role')
            ->where('username', $input['username'])
            ->where('pin', $input['pin'])
            ->first();

        if ($user) {
            return response()->json([
                'message' => 'Berhasil Login',
                'isLogin' => true,
                'user' => $user,
            ], 200);
        } else {
            return response()->json(['message' => 'User Tidak Ditemukan'], 404);
        }
    }
}
