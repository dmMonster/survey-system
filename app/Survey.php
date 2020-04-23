<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $fillable = ['name', 'description', 'end_date', 'token', 'user_id'];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class );
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
