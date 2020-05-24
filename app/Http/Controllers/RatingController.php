<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRating;
use App\Respondent;
use App\Survey;
use App\SurveyRating;

class RatingController extends Controller
{
    public function store(StoreRating $request, string $surveyToken)
    {
        $respondentId = Respondent::select('id')->where('ip', $request->ip())->first()->id;
        $surveyId = Survey::select('id')->where('token', $surveyToken)->first()->id;
        return SurveyRating::create([
            'rating' => $request->input('rating'),
            'description' => $request->input('description'),
            'survey_id' => $surveyId,
            'respondent_id' => $respondentId,
        ]);
    }
}
