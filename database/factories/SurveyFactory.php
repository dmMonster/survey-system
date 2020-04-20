<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Survey;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(Survey::class, function (Faker $faker) {
    $date = date("Y-m-d H:i:s", (time() + 7200));
    return [
        'name' => $faker->word,
        'description' => $faker->sentence(10, true),
        'end_date' => $date,
    ];
});

$factory->state(Survey::class, "token", function () {
    return [
        'token' => Hash::make(date("Y-m-d H:i:s")),
    ];
});
