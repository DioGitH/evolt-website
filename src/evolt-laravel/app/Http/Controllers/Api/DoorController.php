<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoorResource;
use Illuminate\Http\Request;
use App\Models\Door;

class DoorController extends Controller
{
    public function index(){
        $doors = Door::latest()->paginate(5);

        return new DoorResource(true, "Data Pintu", $doors);
    }

}
