<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();

        return new PostResource(true, 'List Data User', $user);
    }
}
