<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController; // <--- Ensure this is here

Route::apiResource('articles', ArticleController::class);