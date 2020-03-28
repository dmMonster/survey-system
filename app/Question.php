<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{

    public function survey()
    {
        $this->belongsTo(Survey::class);
    }

    public function answers()
    {
        $this->hasMany(Answer::class);
    }
}
