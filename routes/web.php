<?php

use App\Http\Controllers\PersonController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PersonController::class, 'index'])->name('people.index');
Route::post('/people', [PersonController::class, 'store'])->name('people.store');
