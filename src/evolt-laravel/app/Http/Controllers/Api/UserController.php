<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();

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
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload photo_profile
        $photo_profile = $request->file('photo_profile');
        $photo_profile->storeAs('public/users', $photo_profile->hashName());

        //create post
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'pin' => $request->pin,
            'photo_profile' => $photo_profile->hashName(),
        ]);

        //return response
        return new PostResource(true, 'Data User Berhasil Ditambahkan!', $user);
    }
}
