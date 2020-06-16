<?php

namespace Tests\Feature;

use App\Answer;
use App\GivenAnswer;
use App\Question;
use App\Respondent;
use App\Result;
use App\Survey;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Airlock\Airlock;
use Tests\TestCase;

class ResultTest extends TestCase
{
    use RefreshDatabase;
    private $responses;
    private $browser;
    private $os;
    private $answers1, $answers2;
    private $user;
    private $survey;
    private $questionSingleChoice, $questionMultiChoice, $questionTextAnswer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        $this->survey = factory(Survey::class)->state('token')->create([
            'user_id' => $this->user->id,
        ]);

        $this->questionSingleChoice = factory(Question::class)->create([
            'survey_id' => $this->survey->id,
            'type' => 'single-choice',
        ]);

        $this->questionMultiChoice = factory(Question::class)->create([
            'survey_id' => $this->survey->id,
            'type' => 'multiple-choice',
        ]);


        $this->questionTextAnswer = factory(Question::class)->create([
            'survey_id' => $this->survey->id,
            'type' => 'text',
        ]);

        $this->answers1 = factory(Answer::class, 5)->create([
            'question_id' => $this->questionSingleChoice->id
        ]);
        $this->answers2 = factory(Answer::class, 5)->create([
            'question_id' => $this->questionMultiChoice->id
        ]);


        $this->browser = 'Browser/00.0';
        $this->os = 'Windows NT 6.1; Win64; x64; rv:75.0';
        $_SERVER['HTTP_USER_AGENT'] = 'Browser/0.0 (' . $this->os . ') Gecko/20100101 ' . $this->browser;

        $this->responses = [
            'responses' => [
                $this->questionSingleChoice->id => [
                    'answerText' => '',
                    'answerIds' => [$this->answers1[0]->id]
                ],
                $this->questionMultiChoice->id => [
                    'answerText' => '',
                    'answerIds' => [$this->answers2[2]->id, $this->answers2[1]->id]
                ],
                $this->questionTextAnswer->id => [
                    'answerText' => 'Test test test.',
                    'answerIds' => []
                ],

            ],
            'survey_id' => $this->survey->id,
        ];

    }

    public function testRespondentCanSaveResult()
    {
        $response = $this->postJson('/api/results', $this->responses);
        $response->assertStatus(200);

        $this->assertDatabaseHas('respondents', [
            'ip' => request()->ip(),
            'browser' => $this->browser,
            'system' => $this->os,
        ]);

        $rowsCount = $this->getConnection()->getPdo()->query('SELECT count(id) FROM results')->fetchColumn();
        $this->assertEquals(1, $rowsCount);

        $this->assertDatabaseHas('given_answers', [
            'text_answer' => null,
            'answer_id' => $this->answers1[0]->id,
        ]);

        $this->assertDatabaseHas('given_answers', [
            'text_answer' => null,
            'answer_id' => $this->answers2[2]->id,
        ]);

        $this->assertDatabaseHas('given_answers', [
            'text_answer' => null,
            'answer_id' => $this->answers2[1]->id,
        ]);
        $this->assertDatabaseHas('given_answers', [
            'question_id' => '3',
            'answer_id' => null,
            'text_answer' => 'Test test test.',
        ]);
    }

    public function testRespondentGiveInvalidSurveyId()
    {
        $response = $this->postJson('/api/results', [
            'responses' => [

            ],
            'survey_id' => 999999999,
        ]);
        $response->assertStatus(404);
    }


    public function testSurveyIsOver()
    {
        $expiredSurvey = factory(Survey::class)->state('token')->create([
            'user_id' => $this->user->id,
            'end_date' => date("Y-m-d H:i:s", time() - 999999),
        ]);

        $response = $this->postJson('/api/results', [
            'responses' => [
            ],
            'survey_id' => $expiredSurvey->id,
        ]);
        $response->assertStatus(403);
    }

    public function testRespondentGiveEmptyResponses()
    {
        $response = $this->postJson('/api/results', [
            'responses' => [
            ],
            'survey_id' => $this->survey->id,
        ]);
        $response->assertStatus(422);

        $responseJson = $response->json();
        $this->assertArrayHasKey('responses', $responseJson['errors'], 'Responses array error.');
    }

    public function testRespondentGiveInvalidResponsesFormat()
    {
        $response = $this->postJson('/api/results', [
            'responses' => [
                '999' => [
                    'answerText' => '',
                    'answerIds' => [$this->answers1[0]->id]
                ],
            ],
            'survey_id' => $this->survey->id,
        ]);
        $response->assertStatus(422);

        $responseJson = $response->json();
        $this->assertArrayHasKey('question_ids', $responseJson['errors'], 'Question id error.');
    }

    public function testUserGetSurveyResult()
    {
        Airlock::actingAs($this->user);

        $respondent = factory(Respondent::class)->create();

        $result = factory(Result::class)->create([
            'survey_id' => $this->survey->id,
            'respondent_id' => $respondent->id,
        ]);


        factory(GivenAnswer::class)->create([
            'result_id' => $result->id,
            'question_id' => $this->questionSingleChoice->id,
            'answer_id' => $this->answers1->toArray()[0]['id'],
        ]);

        factory(GivenAnswer::class)->create([
            'result_id' => $result->id,
            'question_id' => $this->questionMultiChoice->id,
            'answer_id' => $this->answers2->toArray()[0]['id'],
        ]);

        factory(GivenAnswer::class)->create([
            'result_id' => $result->id,
            'question_id' => $this->questionTextAnswer->id,
            'answer_id' => null,
            'text_answer' => 'test',
        ]);


        $response = $this->getJson('/api/surveys/' . $this->survey->id . '/results');

        $responseJson = $response->json();
        $this->assertArrayHasKey('results_count', $responseJson, 'Missing field: results_count.');
        $this->assertEquals(1, $responseJson['results_count']);
        $this->assertArrayHasKey('questions', $responseJson, 'Missing field: questions.');

        $this->assertArrayHasKey('answers', $responseJson['questions'][0], 'Missing field: answers.');
        $this->assertEquals(1, $responseJson['questions'][0]['answers'][0]['given_answers_count']);

        $response->assertStatus(200);
    }

    public function testUserCanNotSeeResultsAnotherUserSurvey()
    {
        $anotherUser = factory(User::class)->create();
        Airlock::actingAs($anotherUser);
        $response = $this->getJson('/api/surveys/' . $this->survey->id . '/results');

        $response->assertStatus(200);

        $response->assertJson([]);
    }

    public function testUserCanGetRespondentsList()
    {
        Airlock::actingAs($this->user);

        $respondent = factory(Respondent::class)->create();

        factory(Result::class)->create([
            'survey_id' => $this->survey->id,
            'respondent_id' => $respondent->id,
        ]);


        $response = $this->get('/api/surveys/' . $this->survey->id . '/respondents');


        $response->assertStatus(200);

        $response->assertJson([$respondent->toArray()]);
    }

    public function testUserCanNotSeeRespondentsListAnotherUserSurvey()
    {
        $anotherUser = factory(User::class)->create();
        Airlock::actingAs($anotherUser);

        $respondent = factory(Respondent::class)->create();

        factory(Result::class)->create([
            'survey_id' => $this->survey->id,
            'respondent_id' => $respondent->id,
        ]);

        $response = $this->get('/api/surveys/' . $this->survey->id . '/respondents');


        $response->assertStatus(404);
    }

    public function testAdminCanSeeAnySurveyResult()
    {
        $admin = factory(User::class)->state('admin')->create();
        Airlock::actingAs($admin);

        $respondent = factory(Respondent::class)->create();

        $result = factory(Result::class)->create([
            'survey_id' => $this->survey->id,
            'respondent_id' => $respondent->id,
        ]);


        factory(GivenAnswer::class)->create([
            'result_id' => $result->id,
            'question_id' => $this->questionSingleChoice->id,
            'answer_id' => $this->answers1->toArray()[0]['id'],
        ]);

        factory(GivenAnswer::class)->create([
            'result_id' => $result->id,
            'question_id' => $this->questionMultiChoice->id,
            'answer_id' => $this->answers2->toArray()[0]['id'],
        ]);

        factory(GivenAnswer::class)->create([
            'result_id' => $result->id,
            'question_id' => $this->questionTextAnswer->id,
            'answer_id' => null,
            'text_answer' => 'test',
        ]);


        $response = $this->getJson('/api/surveys/' . $this->survey->id . '/results');

        $responseJson = $response->json();
        $this->assertArrayHasKey('results_count', $responseJson, 'Missing field: results_count.');
        $this->assertEquals(1, $responseJson['results_count']);
        $this->assertArrayHasKey('questions', $responseJson, 'Missing field: questions.');

        $this->assertArrayHasKey('answers', $responseJson['questions'][0], 'Missing field: answers.');
        $this->assertEquals(1, $responseJson['questions'][0]['answers'][0]['given_answers_count']);

        $response->assertStatus(200);
    }
}
