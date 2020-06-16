<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyRating extends Model
{
    protected $fillable = ['rating', 'description', 'survey_id', 'respondent_id'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function respondent()
    {
        return $this->belongsTo(Respondent::class);
    }
}
