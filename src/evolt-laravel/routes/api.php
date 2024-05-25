<?php

use App\Http\Controllers\Api\DoorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/users', App\Http\Controllers\Api\UserController::class);
Route::apiResource('/doors', App\Http\Controllers\Api\DoorController::class);
Route::get('/doors/get/{id}', [DoorController::class, 'getById']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
