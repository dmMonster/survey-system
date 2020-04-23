<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGivenAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('given_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('result_id');
            $table->foreignId('question_id');
            $table->foreignId('answer_id')->nullable();
            $table->text('text_answer')->nullable();
            $table->timestamps();

            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
            $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('given_answers');
    }
}
