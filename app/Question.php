<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['question_text', 'type', 'survey_id'];

    public function survey()
    {
        $this->belongsTo(Survey::class);
    }

    public function answers()
    {
        $this->hasMany(Answer::class);
    }
}