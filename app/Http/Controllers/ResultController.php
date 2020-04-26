<?php

namespace App\Http\Controllers;

use App\GivenAnswer;
use App\Respondent;
use App\Result;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResultController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();

        $userAgent = explode(' ', $_SERVER['HTTP_USER_AGENT']);
        $browser = end($userAgent);
        $os = explode(')', explode(' (', $_SERVER['HTTP_USER_AGENT'])[1])[0];

        $respondent = Respondent::create([
            'ip' => $request->ip(),
            'browser' => $browser,
            'system' => $os,
        ]);

        $responsesToInsert = [];
        $result = Result::create([
            'respondent_id' => $respondent->id,
            'survey_id' => $request->input('surveyId'),
        ]);


        foreach ($request->input('responses') as $questionId => $response) {
            $i = 0;
            do {
                array_push($responsesToInsert, [
                    'result_id' => $result->id,
                    'question_id' => $questionId,
                    'answer_id' => isset($response['answerIds'][$i]) ? $response['answerIds'][$i] : null,
                    'text_answer' => $response['answerText'],
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
                $i++;
            } while ($i < count($response['answerIds']));


        }
        unset($answer);

        if (GivenAnswer::insert($responsesToInsert)) {
            Db::commit();
            return response(null, 200);
        }

        DB::rollBack();
        return response('Insert Error', 500);
    }
}
