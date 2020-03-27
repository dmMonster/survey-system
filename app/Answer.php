<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{

    public function question()
    {
        $this->belongsTo(Question::class);
    }
}
