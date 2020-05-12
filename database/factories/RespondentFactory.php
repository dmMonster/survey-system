<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Respondent;
use Faker\Generator as Faker;

$factory->define(Respondent::class, function (Faker $faker) {
    return [
        'ip' => $faker->ipv4,
        'system' =>" Test System",
        'browser' => "Test Browser",
    ];
});
