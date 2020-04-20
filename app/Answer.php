<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['answer_text', 'question_id'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
