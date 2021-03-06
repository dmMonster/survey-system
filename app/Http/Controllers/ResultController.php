<?php

namespace App\Http\Controllers;

use App\GivenAnswer;
use App\Http\Requests\StoreResult;
use App\Respondent;
use App\Result;
use App\Survey;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ResultController extends Controller
{
    public function index(int $id)
    {
        $query = Survey::where('id', $id);
        if( !Auth::user()->checkAdmin() ) {
            $query = $query->where('user_id', Auth::id());
        }

        return response()->json($query
            ->with([
                'questions',
                'questions.textAnswers',
                'questions.answers' => function (HasMany $query) {
                    return $query->withCount('givenAnswers');
                }
            ])->withCount('results')->first());
    }

    public function store(StoreResult $request)
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

        $result = Result::create([
            'respondent_id' => $respondent->id,
            'survey_id' => $request->input('survey_id'),
        ]);

        $responses = new GivenAnswer();
        if ($responses->storeResponses($request->input('responses'), $result->id)) {
            Db::commit();
            return response(null, 200);
        }

        DB::rollBack();
        return abort(500, 'DB transaction error. The results cannot be saved.');
    }
}
