<?php

namespace App\Http\Controllers\Api;

use App\Models\Log;
use App\Models\Door;
use App\Models\User;
use App\Models\Doors_Users;
use App\Models\Image;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $username = $request->query('username');
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        $logs = Log::orderBy('created_at', 'desc');

        if ($username) {
            $logs->where('username', 'like', '%' . $username . '%');
        }

        if ($startDate && $endDate) {
            $startDateFormat = \Carbon\Carbon::createFromFormat('d-m-Y', $startDate)->startOfDay();
            $endDateFormat = \Carbon\Carbon::createFromFormat('d-m-Y', $endDate)->endOfDay();
            $logs->whereBetween('created_at', [$startDateFormat, $endDateFormat]);
        } elseif ($startDate) {
            $startDateFormat = \Carbon\Carbon::createFromFormat('d-m-Y', $startDate)->startOfDay();
            $logs->where('created_at', '>=', $startDateFormat);
        } elseif ($endDate) {
            $endDateFormat = \Carbon\Carbon::createFromFormat('d-m-Y', $endDate)->endOfDay();
            $logs->where('created_at', '<=', $endDateFormat);
        }


        $data = $logs->paginate(5);

        return new PostResource(true, "Data Log", $data);
    }

    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'id_pintu' => 'required',
            'pin' => 'required',
            'image_name' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $username = '';
        $id_user = 0;
        $door_name = '';
        $id_door = 0;
        $status = false;
        $log_status = 'Gagal Masuk';
        $image_name = $request->image_name . '.jpg';

        $user = User::where('pin', Hash::make($request->pin))->first();

        if ($user) {
            $username = $user->username;
            $id_user = $user->id_user;
        }

        $door = Door::where('id_door', $request->id_pintu)->first();

        if ($door) {
            $door_name = $door->door_name;
            $id_door = $door->id_door;
        }

        $door_user = Doors_Users::where('id_door', $id_door)
                                ->where('id_user', $id_user)
                                ->first();

        if ($door_user) {
            $status = true;
            $log_status = 'Berhasil Masuk';
        }

        $image = Image::where('image_name', $request->image_name . '.jpg')->first();

        if ($image) {
            $image_name = $image->image_name;
        }

        //create log
        Log::create([
            'username' => $username,
            'door_name' => $door_name,
            'log_status' => $log_status,
            'image_name' => $image_name,
        ]);

        if ($status) {
            return response()->json([
                'success' => true,
                'message' => 'Berhasil Membuka',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Gagal Membuka',
            ], 404);
        }

    }

    public function dashboard() {
        $doors = Door::count();
        $users = User::count();
        $logs = Log::count();

        $data = [
            'doors_count' => $doors,
            'users_count' => $users,
            'logs_count' => $logs,
        ];

        return new PostResource(true, "Data Log", $data);
    }
}
