<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    public function respondent()
    {
        return $this->belongsTo(Respondent::class);
    }

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function givenAnswers()
    {
        return $this->hasMany(GivenAnswer::class);
    }
}
