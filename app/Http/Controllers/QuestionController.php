<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Http\Requests\StoreQuestion;
use App\Http\Requests\UpdateQuestion;
use App\Question;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
   public function index(int $surveyId)
   {
       return Question::where('survey_id', $surveyId)->with('answers')->get();
   }

    public function store(StoreQuestion $request, $id)
    {
        return Question::create([
            'question_text' => $request->input('question_text'),
            'type' => $request->input('type'),
            'survey_id' => $id
        ]);
    }

    public function update(UpdateQuestion $request, int $id)
    {
        $question = Question::where('id', $id)->first();
        if ($request->input('type') === 'text') {
            Answer::where('question_id', $id)->delete();
        }
        return $question->fill($request->input())->save();
    }

    public function delete(int $id)
    {
        $question = Question::where('id', $id)->first();
        if(!is_null($question) && (intval($question->survey->user_id) === Auth::id())  || Auth::user()->checkAdmin()) {
            $question->delete();
            return response(null, 204);
        } else {
            return response(null, 404);
        }
    }
}
