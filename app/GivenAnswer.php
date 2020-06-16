<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class GivenAnswer extends Model
{
    public function storeResponses(array $responses, int $resultId)
    {
        $responsesToInsert = [];
        foreach ($responses as $questionId => $response) {
            $i = 0;
            do {
                array_push($responsesToInsert, [
                    'result_id' => $resultId,
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
        return $this->insert($responsesToInsert);
    }

    public function result()
    {
        return $this->belongsTo(Result::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function answer()
    {
        return $this->belongsTo(Answer::class);
    }
}
