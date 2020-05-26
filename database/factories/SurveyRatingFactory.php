<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\SurveyRating;
use Faker\Generator as Faker;

$factory->define(SurveyRating::class, function (Faker $faker) {
    return [
        'rating' => $faker->numberBetween(1, 10),
        'description' => $faker->sentence,
    ];
});
