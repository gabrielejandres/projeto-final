<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('comments', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('content');
          $table->float('evaluation')->nullable();
          $table->unsignedBigInteger('republic_id')->nullable();
          $table->unsignedBigInteger('user_id')->nullable();
          $table->date('date')->nullable();
          $table->timestamps();
      });

      //Foreign key
    Schema::table('comments', function (Blueprint $table) {
        $table->foreign('republic_id')->references('id')->on('republics')->onDelete('cascade');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
