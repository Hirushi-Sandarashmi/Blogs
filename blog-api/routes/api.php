<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Middleware\VerifyToken;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/blog-posts', [BlogPostController::class, 'index']);

Route::middleware([VerifyToken::class])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user', [UserController::class, 'update']);
    Route::post('/blog-posts', [BlogPostController::class, 'store']);
    Route::get('/blog-posts/{id}', [BlogPostController::class, 'show']);
    Route::put('/blog-posts/{id}', [BlogPostController::class, 'update']);
    Route::delete('/blog-posts/{id}', [BlogPostController::class, 'destroy']);
});

Route::middleware([AdminMiddleware::class])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::delete('/posts/{id}', [BlogPostController::class, 'destroyAny']);
});