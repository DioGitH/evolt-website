<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\DoorController;
use App\Http\Controllers\Api\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/users', UserController::class);
Route::post('/login', [LoginController::class, 'login']);
Route::apiResource('/doors', DoorController::class);
Route::get('/doors/get/{id}', [DoorController::class, 'getById']);
Route::post('/image', [ImageController::class, 'store']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
