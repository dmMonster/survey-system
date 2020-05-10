<?php

namespace App\Http\Controllers;

use App\Respondent;
use App\Result;
use App\Survey;
use Illuminate\Support\Facades\Auth;

class RespondentController extends Controller
{
    public function index(int $id)
    {
        Survey::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $respondentIds = Result::where('survey_id', $id)
            ->select('respondent_id')
            ->groupBy('respondent_id')
            ->get()
            ->pluck('respondent_id');
        return Respondent::whereIn('id', $respondentIds)->get();
    }
}
