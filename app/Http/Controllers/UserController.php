<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
    /**
     * Get all users
     * @return mixed
     */
    public function index() {
        return User::get();
    }
}
