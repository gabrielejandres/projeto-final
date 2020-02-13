<?php

use Illuminate\Database\Seeder;

class User_TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //gera dados aleatorios
        factory (App\User::class,12)->create();
    }
}
