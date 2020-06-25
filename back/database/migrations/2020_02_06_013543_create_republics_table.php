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
          $table->string('info')->nullable();
          $table->integer('single_rooms')->nullable()->default(0);
          $table->integer('double_rooms')->nullable()->default(0);
          $table->integer('triple_rooms')->nullable()->default(0);
          $table->string('single_price')->nullable()->default(0);
          $table->string('double_price')->nullable()->default(0);
          $table->string('triple_price')->nullable()->default(0);
          $table->decimal('evaluation')->nullable();
          $table->string('street')->nullable();
          $table->string('number')->nullable();
          $table->string('neighborhood')->nullable();
          $table->string('complement')->nullable();
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
