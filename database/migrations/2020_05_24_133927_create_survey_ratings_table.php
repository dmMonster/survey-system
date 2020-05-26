<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveyRatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('survey_ratings', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('rating');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreignId('survey_id')->references('id')->on('surveys')->onDelete('cascade');
            $table->foreignId('respondent_id')->references('id')->on('surveys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('survey_ratings');
    }
}
