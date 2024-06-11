<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\DoorController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\LogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/users', UserController::class);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/login/mobile', [LoginController::class, 'loginMobile']);
Route::apiResource('/doors', DoorController::class);
Route::get('/doors/get/{id}', [DoorController::class, 'getById']);
Route::get('/doorname/{id_user}', [DoorController::class, 'getDoorName']);
Route::post('/image', [ImageController::class, 'store']);
Route::delete('/image/{image_name}', [ImageController::class, 'destroy']);
Route::apiResource('/log', LogController::class);
Route::post('/log/mobile', [LogController::class, 'storeMobile']);
Route::get('/dashboard/get/data', [LogController::class, 'dashboard']);
// Route::get('/log', [ImageController::class, 'dashboard']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
