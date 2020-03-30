<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Http\Requests\StoreAnswer;

class AnswerController extends Controller
{
    /**
     * Add an answer to the question
     * @param StoreAnswer $request
     * @param int $surveyId  Used during validation
     * @param int $questionId
     * @return mixed
     */
    public function store(StoreAnswer $request, $surveyId, $questionId)
    {
        return Answer::create([
            'answer_text' => $request->input("answer_text"),
            'question_id' => $questionId,
        ]);
    }
}
