<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Auth::routes();
Route::post("/login", "Auth\LoginController@login");
Route::post("/register", "Auth\RegisterController@register");
Route::get("/logout", "Auth\LoginController@logout");

Route::get("/isLogged", "Auth\LoginController@isLogged");

Route::get("/surveys/{token}/start", "SurveyController@startSurvey");
Route::post("/results", "ResultController@store");
Route::post("/surveys/{token}/ratings", "RatingController@store");

Route::group(['middleware' => ['auth:airlock']], function () {
    Route::get("/users", "UserController@index")->middleware("isAdmin");
    Route::delete("/users/{id}", "UserController@destroy");
    Route::get("/users/{id}", "UserController@show");
    Route::put("/users/{id}", "UserController@update");

    Route::get("/surveys", "SurveyController@index");
    Route::get("/surveys/{id}", "SurveyController@index");
    Route::post("/surveys", "SurveyController@store");
    Route::put("/surveys/{id}", "SurveyController@update");
    Route::delete("/surveys/{id}", "SurveyController@delete");

    Route::get("/surveys/{id}/questions", "QuestionController@index");
    Route::post("/surveys/{id}/questions", "QuestionController@store");
    Route::put("/questions/{id}", "QuestionController@update");
    Route::delete("/questions/{id}", "QuestionController@delete");

    Route::post("/questions/{questionId}/answers", "AnswerController@store");
    Route::put("/questions/{questionId}/answers", "AnswerController@update");

    Route::get("/surveys/{id}/results", "ResultController@index");
    Route::get("/surveys/{id}/respondents", "RespondentController@index");
});


Route::middleware('auth:airlock')->get('/user', function (Request $request) {
    return $request->user();
});
