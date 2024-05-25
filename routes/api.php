<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request){
        return $request->user();
    });
    Route::post('/logout',[AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
});

Route::apiResource('category', CategoryController::class);
Route::get('/product/search', [ProductController::class, 'search']);
Route::apiResource('product', ProductController::class);


Route::post('/checkout', 'App\Http\Controllers\PaymentController@createPaymentIntent');


