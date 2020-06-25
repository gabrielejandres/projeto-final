<?php

use Illuminate\Database\Seeder;

class Comment_TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //gera dados aleatorios
      factory (App\Comment::class,12)->create();
    }
}
