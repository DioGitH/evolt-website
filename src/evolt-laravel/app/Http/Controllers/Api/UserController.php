<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $user = User::with('role')->get();

        $user->makeHidden('pin');

        return new PostResource(true, 'List Data User', $user);
    }

    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required',
            'pin' => 'required',
            'photo_profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'id_role' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload photo_profile
        $photo_profile = $request->file('photo_profile');
        $photo_profile->storeAs('public/users', $photo_profile->hashName());

        $tempUser = User::where('username', $request->username)->first();

        if ($tempUser) {
            return response()->json([
                'success' => false,
                'message' => 'Username sudah digunakan',
            ], 409);
        }

        $tempUser = User::all()->filter(function ($user) use ($request) {
            return Hash::check($request->pin, $user->pin);
        })->first();

        if ($tempUser) {
            return response()->json([
                'success' => false,
                'message' => 'Pin sudah digunakan',
            ], 409);
        }

        //create post
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'pin' => Hash::make($request->pin),
            'photo_profile' => $photo_profile->hashName(),
            'id_role' => $request->id_role,
        ]);

        $user->makeHidden('pin');

        //return response
        return new PostResource(true, 'Data User Berhasil Ditambahkan!', $user);
    }

    public function show($id_user)
    {
        $user = User::where('id_user', $id_user)->first();
        $user->makeHidden('pin');

        //return single User as a resource
        if ($user) {
            // Mengembalikan data pengguna sebagai resource
            return new PostResource(true, 'Data User Ditemukan!', $user);
        } else {
            // Jika pengguna tidak ditemukan, kembalikan pesan kesalahan
            return response()->json([
                'success' => false,
                'message' => 'Data User Tidak Ditemukan!',
            ], 404);
        }
    }

    public function update(Request $request, $id_user)
    {
        $user = User::where('id_user', $id_user)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Data User Tidak Ditemukan!',
            ], 404);
        }

        //define validation rules
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required',
            // 'pin' => 'required',
            'id_role' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tempUser = User::where('username', $request->username)->first();

        if ($tempUser && $tempUser->username != $user->username) {
            return response()->json([
                'success' => false,
                'message' => 'Username sudah digunakan',
            ], 409);
        }

        $tempUser = User::all()->filter(function ($user) use ($request) {
            return Hash::check($request->pin, $user->pin);
        })->first();

        if ($tempUser) {
            return response()->json([
                'success' => false,
                'message' => 'Pin sudah digunakan',
            ], 409);
        }

        if ($request->pin) {
            $user->update([
                'pin' => Hash::make($request->pin),
            ]);
        }

        //check if photo_profile is not empty
        if ($request->hasFile('photo_profile')) {

            //upload photo_profile
            $photo_profile = $request->file('photo_profile');
            $photo_profile->storeAs('public/users', $photo_profile->hashName());

            //delete old photo_profile
            Storage::delete('public/users/'.$user->photo_profile);

            //update user with new photo_profile
            $user->update([
                'username' => $request->username,
                'email' => $request->email,
                // 'pin' => $request->pin,
                'photo_profile' => $photo_profile->hashName(),
                'id_role' => $request->id_role,
            ]);

        } else {

            //update user without photo_profile
            $user->update([
                'username' => $request->username,
                'email' => $request->email,
                // 'pin' => $request->pin,
                'id_role' => $request->id_role,
            ]);
        }

        $user->makeHidden('pin');

        //return response
        return new PostResource(true, 'Data User Berhasil Diubah!', $user);
    }

    public function destroy($id_user)
    {
        $user = User::where('id_user', $id_user)->first();

        //delete image
        Storage::delete('public/users/'.$user->photo_profile);

        //delete user
        $user->delete();

        //return response
        return new PostResource(true, 'Data User Berhasil Dihapus!', null);
    }
}
