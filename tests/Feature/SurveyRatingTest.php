<?php

namespace Tests\Feature;

use App\Respondent;
use App\Survey;
use App\SurveyRating;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Airlock\Airlock;
use Tests\TestCase;

class SurveyRatingTest extends TestCase
{
    use RefreshDatabase;

    public function testRespondentAddRatingToSurvey()
    {
        $user = factory(User::class)->create();
        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id
        ]);
        $respondent = factory(Respondent::class)->create();
        $rating = factory(SurveyRating::class)->make()->toArray();

        $response = $this->post('/api/surveys/' . $survey->token . '/ratings', $rating,
            ['REMOTE_ADDR' => $respondent->ip]);


        $response->assertStatus(201);

        $this->assertDatabaseHas('survey_ratings', $rating);
    }

    public function testRespondentGiveInvalidRating()
    {
        $user = factory(User::class)->create();
        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id
        ]);
        $respondent = factory(Respondent::class)->create();

        $response = $this->postJson('/api/surveys/' . $survey->token . '/ratings', [
            'rating' => 999,
            'description' => ''
        ],
            ['REMOTE_ADDR' => $respondent->ip]);

        $response->assertStatus(422);

        $responseJson = $response->json();
        $this->assertArrayHasKey('rating', $responseJson['errors'], 'Incorrect rating error.');
    }

    public function testUserGetSurveyRating()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id
        ]);
        $respondent = factory(Respondent::class)->create();

        $ratings = factory(SurveyRating::class, 2)->create([
            'survey_id' => $survey->id,
            'respondent_id' => $respondent->id
        ])->toArray();


        $response = $this->get('/api/surveys/' . $survey->id . '/ratings');
        $response->assertStatus(200);

        $this->assertEquals($response['opinions'], $ratings);

        $sum = 0;
        foreach ($ratings as $rating) {
            $sum += $rating['rating'];
        }
        unset($rating);

        $this->assertEquals($response['average_rating'], $sum / count($ratings));
    }

    public function testUserCannotGetOtherUserSurveyRating()
    {
        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        Airlock::actingAs($user2);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id
        ]);
        $respondent = factory(Respondent::class)->create();

        factory(SurveyRating::class, 2)->create([
            'survey_id' => $survey->id,
            'respondent_id' => $respondent->id
        ])->toArray();


        $response = $this->get('/api/surveys/' . $survey->id . '/ratings');
        $response->assertStatus(403);
    }

    public function testAdminCanSeeAnySurveyRating()
    {
        $user = factory(User::class)->create();
        $admin = factory(User::class)->state('admin')->create();
        Airlock::actingAs($admin);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id
        ]);
        $respondent = factory(Respondent::class)->create();

        $ratings = factory(SurveyRating::class, 2)->create([
            'survey_id' => $survey->id,
            'respondent_id' => $respondent->id
        ])->toArray();


        $response = $this->get('/api/surveys/' . $survey->id . '/ratings');
        $response->assertStatus(200);

        $this->assertEquals($response['opinions'], $ratings);

        $sum = 0;
        foreach ($ratings as $rating) {
            $sum += $rating['rating'];
        }
        unset($rating);

        $this->assertEquals($response['average_rating'], $sum / count($ratings));
    }
}
