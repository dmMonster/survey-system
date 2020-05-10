<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['question_text', 'type', 'survey_id'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function givenAnswers()
    {
        return $this->hasMany(GivenAnswer::class);
    }

    public function textAnswers()
    {
        return $this->hasMany(GivenAnswer::class)->where('text_answer', '<>', null);
    }
}
