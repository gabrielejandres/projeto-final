<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepublicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('republics', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('name');
          $table->string('info');
          $table->integer('single_rooms');
          $table->integer('double_rooms');
          $table->integer('triple_rooms');
          $table->decimal('single_price');
          $table->decimal('double_price');
          $table->decimal('triple_price');
          $table->decimal('evaluation')->nullable();
          $table->string('street');
          $table->string('number');
          $table->string('neighborhood');
          $table->string('complement');
          $table->string('photo')->nullable();
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('republics');
    }
}
