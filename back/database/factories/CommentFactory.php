<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    return [
      'content'=>$faker->text($maxNbChars = 100),
      'evaluation'=>$faker->numberBetween($min = 1, $max = 5),
      'republic_id'=>$faker->numberBetween($min = 1, $max = 50),
      'user_id'=>$faker->numberBetween($min = 1, $max = 50),
    ];
});
