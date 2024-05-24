<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/users', App\Http\Controllers\Api\UserController::class);
Route::apiResource('/doors', App\Http\Controllers\Api\DoorController::class);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
