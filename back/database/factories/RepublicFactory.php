<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Republic;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Republic::class, function (Faker $faker) {
    return [
      'name'=>$faker->companySuffix,
      'info'=>$faker->text($maxNbChars = 100),
      'single_rooms'=>$faker->randomDigit(),
      'double_rooms'=>$faker->randomDigit(),
      'triple_rooms'=>$faker->randomDigit(),
      'single_price'=>$faker->numberBetween($min = 300, $max = 1200),
      'double_price'=>$faker->numberBetween($min = 300, $max = 1200),
      'triple_price'=>$faker->numberBetween($min = 300, $max = 1200),
      'evaluation'=>$faker->numberBetween($min = 1, $max = 5),
      'street'=>$faker->streetName,
      'number'=>$faker->buildingNumber,
      'neighborhood'=>$faker->city,
      'complement'=>$faker->text($maxNbChars = 30),
    ];
});
