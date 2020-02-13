<?php

use Illuminate\Database\Seeder;

class Republic_TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //gera dados aleatorios
      factory (App\Republic::class,12)->create();
    }
}
