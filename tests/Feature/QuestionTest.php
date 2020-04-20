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

    public function testUserCanUpdateQuestion()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id,
            ]
        );

        $question = factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $updatedQuestion = factory(Question::class)->make()->toArray();

        $response = $this->putJson('/api/questions/' . $question->id, $updatedQuestion);
        $response->assertStatus(200);

        $this->assertDatabaseHas('questions', $updatedQuestion);
    }

    public function testUserCanNotUpdateOtherUserQuestion()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $user2 = factory(User::class)->create();

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user2->id,
            ]
        );

        $question = factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $updatedQuestion = factory(Question::class)->make()->toArray();

        $response = $this->putJson('/api/questions/' . $question->id, $updatedQuestion);
        $response->assertStatus(403);
    }

    public function testAdminCanEditAnyQuestion()
    {
        $admin = Airlock::actingAs(factory(User::class)->state("admin")->make());
        Airlock::actingAs($admin);

        $user = factory(User::class)->create();
        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id,
            ]
        );

        $question = factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $updatedQuestion = factory(Question::class)->make()->toArray();

        $response = $this->putJson('/api/questions/' . $question->id, $updatedQuestion);
        $response->assertStatus(200);

        $this->assertDatabaseHas('questions', $updatedQuestion);
    }

    public function testUserGiveInvalidDataToUpdateQuestion()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id,
            ]
        );

        factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $updatedQuestion = [
            'question_text' => '',
            'type' => 'non-exist',
        ];

        $response = $this->putJson('/api/questions/' . '-1', $updatedQuestion);
        $response->assertStatus(422);

        $responseJson = $response->json();
        $this->assertArrayHasKey('id', $responseJson['errors'], 'Id error.');
        $this->assertArrayHasKey('question_text', $responseJson['errors'], 'Question text error.');
        $this->assertArrayHasKey('type', $responseJson['errors'], 'Question type error.');
    }

    //delete question

    public function testUserCanDeleteQuestion()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id,
            ]
        );

        $question = factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $response = $this->delete('/api/questions/' . $question->id);
        $response->assertStatus(204);

        $this->assertDatabaseMissing('questions', $question->toArray());
    }

    public function testUserCanNotDeleteOtherUserQuestion()
    {
        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        Airlock::actingAs($user2);

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id,
            ]
        );

        $question = factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $response = $this->delete('/api/questions/' . $question->id);
        $response->assertStatus(404);
    }


    public function testAdminCanDeleteAnyQuestion()
    {
        $user = factory(User::class)->create();
        $admin = factory(User::class)->state('admin')->create();
        Airlock::actingAs($admin);

        $survey = factory(Survey::class)->state('token')->create([
                'user_id' => $user->id,
            ]
        );

        $question = factory(Question::class)->create([
            'survey_id' => $survey->id,
        ]);

        $response = $this->delete('/api/questions/' . $question->id);
        $response->assertStatus(204);

        $this->assertDatabaseMissing('questions', $question->toArray());
    }

}
