<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Http\Requests\StoreQuestion;
use App\Http\Requests\UpdateQuestion;
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

    public function update(UpdateQuestion $request, $id)
    {
        $question = Question::where('id', $id)->first();
        if ($request->input('type') === 'text') {
            Answer::where('question_id', $id)->delete();
        }
        return $question->fill($request->input())->save();
    }
}
