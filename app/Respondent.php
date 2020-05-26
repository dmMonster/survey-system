<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Respondent extends Model
{
    protected $fillable = ['ip', 'browser', 'system'];

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function ratings()
    {
        return $this->hasMany(SurveyRating::class);
    }
}
