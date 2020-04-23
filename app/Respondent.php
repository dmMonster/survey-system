<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Respondent extends Model
{
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
