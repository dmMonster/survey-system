<?php

namespace Tests\Feature;

use App\Question;
use App\Survey;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Airlock\Airlock;
use Tests\TestCase;

class AnswerTest extends TestCase
{
    use RefreshDatabase;

    private $user, $survey, $question;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        Airlock::actingAs($this->user);

        $this->survey = factory(Survey::class)->state('token')->create([
            'user_id' => $this->user->id,
        ]);

        $this->question = factory(Question::class)->create([
            'survey_id' => $this->survey->id,
        ]);
    }

    public function testUserCanAddAnswerToQuestion()
    {
        $response = $this->postJson('/api/surveys/' . $this->survey->id . '/questions/' . $this->question->id . '/answers', [
            'answer_text' => 'Answer test',
        ]);
        $response->assertCreated();
    }

    public function testUserGiveInvalidAnswer()
    {
        $response = $this->postJson('/api/surveys/' . $this->survey->id . '/questions/' . $this->question->id . '/answers', [
            'answer_text' => '',
        ]);
        $response->assertStatus(422);
    }

    public function testUserCannotAddAnswerToNotExistQuestion()
    {
        $response = $this->postJson('/api/surveys/' . $this->survey->id . '/questions/' . ($this->question->id + 100) . '/answers', [
            'answer_text' => 'Answer test',
        ]);
        $response->assertStatus(422);
    }

    public function testUserCannotAddAnswerToNotExistSurvey()
    {
        $response = $this->postJson('/api/surveys/' . ($this->survey->id + 100) . '/questions/' . $this->question->id . '/answers', [
            'answer_text' => 'Answer test',
        ]);
        $response->assertStatus(422);
    }

    public function testUserCannotAddAnswerToOtherUserSurveyQuestions()
    {
        $user2 = factory(User::class)->create();
        Airlock::actingAs($user2);

        $response = $this->postJson('/api/surveys/' . $this->survey->id . '/questions/' . $this->question->id . '/answers', [
            'answer_text' => 'Answer test',
        ]);
        $response->assertStatus(403);
    }
}
