<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSurvey;
use App\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    public function index()
    {
        return Survey::where('user_id', Auth::id())->get();
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(['name', 'description', 'end_date']), [
            'name' =>['string', 'max:255', 'required'],
            'description' =>['string', 'max:255', 'required'],
            'end_date' => ['date_format:Y-m-d H:i:s', 'required']
        ]);

        if($validator->fails()){
            return response($validator->messages(),400);
        }


        return Survey::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'end_date' => $request->input('end_date'),
            'token' => Hash::make($request->input('end_data')),
            'user_id' => Auth::id(),
        ]);
    }

    public function update(UpdateSurvey $request, int $id)
    {
        return Survey::where("id", $id)
            ->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'end_date' => $request->input('end_date'),
            ]);
    }
}
