<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestion;
use App\Question;

class QuestionController extends Controller
{
    public function store(StoreQuestion $request, $id)
    {
        return Question::create([
            'question_text' => $request->input('question_text'),
            'type' => $request->input('type'),
            'survey_id' => $id
        ]);
    }
}
