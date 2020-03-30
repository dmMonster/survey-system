<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Question;
use Faker\Generator as Faker;

$factory->define(Question::class, function (Faker $faker) {
    return [
        'question_text' => $faker->sentence,
        'type' => $faker->randomElement(['multiple-choice','single-choice', 'text'])
    ];
});
