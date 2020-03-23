<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Get all users
     * @return mixed
     */
    public function index()
    {
        return User::get();
    }

    /**
     * Remove the specific user.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return User::where("id", $id)->delete();
    }
}
