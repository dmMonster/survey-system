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


Route::group(['middleware' => ['auth:airlock']], function () {
    Route::get("/users", "UserController@index")->middleware("isAdmin");
    Route::delete("/users/{id}", "UserController@destroy")->middleware("isAdmin");
    Route::get("/users/{id}", "UserController@show")->middleware("isAdmin");
    Route::put("/users/{id}", "UserController@update")->middleware("isAdmin");

    Route::post("/surveys","SurveyController@store");
    Route::get("/surveys", "SurveyController@index");
    Route::put("/surveys/{id}", "SurveyController@update");
    Route::delete("/surveys/{id}", "SurveyController@delete");

    Route::post("/surveys/{id}/questions", "QuestionController@store");
    Route::put("/questions/{id}","QuestionController@update");
    Route::post("/surveys/{surveyId}/questions/{questionId}/answers", "AnswerController@store");
    Route::put("/questions/{questionId}/answers", "AnswerController@update");

});


Route::middleware('auth:airlock')->get('/user', function (Request $request) {
    return $request->user();
});
