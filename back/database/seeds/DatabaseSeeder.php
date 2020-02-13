<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //seeders que serão executadas
        $this->call(Republic_TableSeeder::class);
        $this->call(User_TableSeeder::class);
        $this->call(Comment_TableSeeder::class);
    }
}
