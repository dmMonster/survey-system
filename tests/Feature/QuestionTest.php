<?php

namespace Tests\Feature;

use App\Question;
use App\Survey;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Airlock\Airlock;
use Tests\TestCase;

class QuestionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserCanAddQuestionToSurvey()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id
            ]
        );

        $question = factory(Question::class)->make()->toArray();

        $response = $this->post('/api/surveys/' . $survey->id . '/questions', $question);
        $response->assertStatus(201);
        $this->assertDatabaseHas('questions', $question);
    }

    public function testUserCannotStoreQuestionToOtherUserSurveys()
    {
        $user1 = factory(User::class)->create();
        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user1->id
            ]
        );

        $user2 = factory(User::class)->create();
        Airlock::actingAs($user2);

        $question = factory(Question::class)->make()->toArray();

        $response = $this->post('/api/surveys/' . $survey->id . '/questions', $question);
        $response->assertStatus(403);
    }

    public function testUserGiveInvalidQuestionType()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);
        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id
            ]
        );

        $response = $this->postJson('/api/surveys/' . $survey->id . '/questions', [
            'question_text' => 'Question',
            'type' => 'invalid-------------------------'
        ]);
        $response->assertStatus(422);
    }

    public function testUserGiveInvalidQuestionText()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);
        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id
            ]
        );

        $response = $this->postJson('/api/surveys/' . $survey->id . '/questions', [
            'question_text' => '',
            'type' => 'single-choice'
        ]);
        $response->assertStatus(422);
    }

    public function testUserAddQuestionToNonCreateSurvey()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $response = $this->postJson('/api/surveys/' . 0 . '/questions', [
            'question_text' => 'Question',
            'type' => 'single-choice'
        ]);

        $response->assertStatus(404);
    }
}
