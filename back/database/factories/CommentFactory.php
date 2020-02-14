<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
      'content'=>$faker->text($maxNbChars = 50),
      'evaluation'=>$faker->numberBetween($min = 1, $max = 5),
      'republic_id'=>$faker->numberBetween($min = 1, $max = 10),
      'date'=>$faker->date($format = 'Y-m-d', $max = 'now'),
      'user_id'=>$faker->numberBetween($min = 1, $max = 10),
    ];
});
