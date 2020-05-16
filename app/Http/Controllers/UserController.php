<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        if(!Auth::user()->checkAdmin()) {
            return User::where('id', Auth::id())->get();
        }
        return User::where('id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(['name', 'email', 'password']), [
            'name' =>['string', 'max:255'],
            'email' =>['string', 'email', 'max:255'],

        ]);

        if($validate->fails()){
            return response($validate->messages(),400);
        }

        if(!Auth::user()->checkAdmin()) {
            $userId = Auth::id();
            $isAdmin = false;
        } else {
            $userId = $id;
            $isAdmin = boolval($request->input("is_admin"));
        }

        return User::where("id", $userId)->first()->update([
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "is_admin" => $isAdmin,
        ]);


    }

   /**
     * Remove the specific user.
     *
     * @param  int  $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|Response
     */
    public function destroy(int $id)
    {
        if(Auth::user()->checkAdmin() || Auth::id() === $id) {
            $userToDelete = User::where("id", $id)->first();

            if($userToDelete->is_admin && $adminNumber = count(User::where('is_admin', true)->get()) <= 1) {
                return response()->json([
                    'message'=> 'You cannot delete the last administrator account!',
                ], 403);
            } else {
                return $userToDelete->delete();
            }

        }
        return response()->json([
            'message'=> 'You cannot delete this account!',
        ], 403);
}
}
