<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoorResource;
use Illuminate\Http\Request;
use App\Models\Door;
use Illuminate\Support\Facades\Validator;

class DoorController extends Controller
{
    public function index(){
        $doors = Door::paginate(5);

        return new DoorResource(true, "Data Pintu", $doors);
    }

    public function getById($id){
        $door = Door::with('users')->find($id);

        return new DoorResource(true, "Data Pintu", $door);

    }

    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'door_name'         => 'required',
            'door_description'  => 'required',
            'door_status'       => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create post
        $door = Door::create([
            'door_name'         => $request->door_name,
            'door_description'  => $request->door_description,
            'door_status'       => $request->door_status,
        ]);

        $selectUsers = $request->id_user;

        foreach($selectUsers as $userId){
            $door->users()->attach($userId);
        }


        //return response
        return new DoorResource(true, 'Data Door Berhasil Ditambahkan!', $door);
    }

    public function show(Door $door)
    {
        //return single post as a resource
        return new DoorResource(true, 'Data Door Ditemukan!', $door);
    }

    public function update(Request $request, Door $door)
    {
        //define validation rules
        // $validator = Validator::make($request->all(), [
        //     // 'door_name'     => 'required',
        //     // 'door_description'     => 'required',
        //     'door_status' => 'required',
        // ]);

        // //check if validation fails
        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }

        if ($request->door_name && $request->door_description) {
            $door->update([
                'door_name'         => $request->door_name,
                'door_description'  => $request->door_description,
                'door_status'       => $request->door_status,
            ]);

            $userUpdated = $request->id_user;
            $door->users()->sync($userUpdated);
        } else {
            $door->update([
                'door_status' => $request->door_status,
            ]);
        }

        //return response
        return new DoorResource(true, 'Data Door Berhasil Diubah!', $door);
    }

    public function destroy($id)
    {

        $door = Door::findOrFail($id);
        // $door->users()->detach();
        $door->delete();

        //return response
        return new DoorResource(true, 'Data Door Berhasil Dihapus!', null);
    }

}
