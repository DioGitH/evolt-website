<?php

namespace App\Http\Controllers\Api;

use App\Models\Image;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'image_name' => 'required',
            'image_file' => 'required|image|mimes:jpg',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image_file
        $image_name = $request->image_name;
        $image_file = $request->file('image_file');

        $image_name = $image_name . '.jpg';
        $image_file->storeAs('public/images', $image_name);

        //create image
        Image::create([
            'image_name' => $image_name,
        ]);

        //return response
        return new PostResource(true, 'Data Image Berhasil Ditambahkan!', null);
    }
}
