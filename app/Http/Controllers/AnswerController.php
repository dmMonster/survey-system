<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Http\Requests\StoreAnswer;
use Carbon\Carbon;

class AnswerController extends Controller
{
    /**
     * Add an answer to the question
     * @param StoreAnswer $request
     * @param int $surveyId Used during validation
     * @param int $questionId
     * @return mixed
     */
    public function store(StoreAnswer $request, $surveyId, $questionId)
    {
        $answersToInsert = [];
        foreach (json_decode($request->input('answers'), true) as $answer) {
            array_push($answersToInsert, [
                'answer_text' => $answer,
                'question_id' => $questionId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
        unset($answer);

        return response(Answer::insert($answersToInsert), 201);
    }
}
