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
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'image_name' => 'required|string',
            'image' => 'required|string', // Base64 encoded image data
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Decode the Base64 encoded image data
        $imageData = $request->input('image');
        $imageData = base64_decode($imageData);

        if ($imageData === false) {
            return response()->json(['error' => 'Invalid base64 string'], 400);
        }

        // Define the image name and path
        $imageName = $request->input('image_name') . '.jpg';
        $imagePath = 'public/images/' . $imageName;

        echo "Image Name: " . $imageName . "\n";
        echo "Image Path: " . $imagePath . "\n";

        // Save the image to the storage
        Storage::put($imagePath, $imageData);

        // Create the image record in the database
        Image::create([
            'image_name' => $imageName,
        ]);

        // Return a success response
        // return new PostResource(true, 'Data Image Berhasil Ditambahkan!', null);
        return response()->json([
            'success' => true,
            'message' => 'Gambar Berhasil Disimpan',
        ], 200);
    }

    public function destroy($image_name)
    {

        $door = Image::where('image_name', $image_name . '.jpg')->first();
        $door->delete();

        //return response
        return new PostResource(true, 'Data Image Berhasil Dihapus!', null);
    }
}
