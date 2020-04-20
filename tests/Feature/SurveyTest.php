<?php

namespace Tests\Feature;

use App\Survey;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Airlock\Airlock;
use Tests\TestCase;

class SurveyTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanCreateSurvey()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->make()->toArray();

        $response = $this->post('/api/surveys', $survey);
        $response->assertCreated();

        $this->assertDatabaseHas('surveys', $survey);

    }

    public function testUserGiveInvalidDate()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $response = $this->post('/api/surveys', [
            'name' => 'Test',
            'description' => 'Test',
            'end_date' => ''
        ]);
        $response->assertStatus(400);

        $dateError = array_key_exists('end_date', $response->json());
        $this->assertTrue($dateError);
    }

    public function testUserGiveInvalidName()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $response = $this->post('/api/surveys', [
            'name' => '',
            'description' => 'Test',
            'end_date' => date('Y-m-d H:i:s')
        ]);
        $response->assertStatus(400);

        $nameError = array_key_exists('name', $response->json());
        $this->assertTrue($nameError);
    }

    public function testUserGiveInvalidDescription()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $response = $this->post('/api/surveys', [
            'name' => 'Test',
            'description' => '',
            'end_date' => date('Y-m-d H:i:s')
        ]);
        $response->assertStatus(400);

        $descriptionError = array_key_exists('description', $response->json());
        $this->assertTrue($descriptionError);
    }

    public function testGetLoggedUserSurveys()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);
        $response = $this->get('/api/surveys');
        $response->assertJson([$survey->toArray()]);
    }

    public function testGetUserSurveysWhenNotLogged()
    {
        $user = factory(User::class)->create();

        factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);
        $response = $this->get('/api/surveys');
        $response->assertStatus(401);
    }

    //update specific survey
    public function testUserCanUpdateHisSurvey()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $newSurveyData = factory(Survey::class)->make()->toArray();

        $response = $this->putJson('/api/surveys/' . $survey->id, $newSurveyData);
        $response->assertStatus(200);

        $this->assertDatabaseHas('surveys', $newSurveyData);

    }

    public function testUserGiveInvalidDataToUpdateSurvey()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $newSurveyData = factory(Survey::class)->make([
            'name' => null,
            'description' => null,
            'end_date' => '2077-20-20 29:20:00',
        ])->toArray();

        $response = $this->putJson('/api/surveys/' . $survey->id, $newSurveyData);
        $response->assertStatus(422);

        $responseJson = $response->json();
        $this->assertArrayHasKey('name', $responseJson['errors'], 'Bad name.');
        $this->assertArrayHasKey('description', $responseJson['errors'], 'Bad description.');
        $this->assertArrayHasKey('end_date', $responseJson['errors'], 'Bad date.');
    }

    public function testUserCanNotEditSomeoneElseSurvey()
    {
        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        Airlock::actingAs($user2);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $newSurveyData = factory(Survey::class)->make()->toArray();
        $response = $this->putJson('/api/surveys/' . $survey->id, $newSurveyData);

        $response->assertStatus(403);
    }

    public function testAdminCanEditAnySurvey()
    {
        $user = factory(User::class)->create();
        $admin = factory(User::class)->state('admin')->create();
        Airlock::actingAs($admin);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $newSurveyData = factory(Survey::class)->make()->toArray();
        $response = $this->putJson('/api/surveys/' . $survey->id, $newSurveyData);
        $response->assertStatus(200);

        $this->assertDatabaseHas('surveys', $newSurveyData);
    }

    //deleting survey
    public function testUserCanDeleteTheirOwnSurvey()
    {
        $user = factory(User::class)->create();
        Airlock::actingAs($user);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $response = $this->delete('/api/surveys/' . $survey->id);
        $response->assertStatus(200);

        $this->assertDatabaseMissing('surveys', $survey->toArray());
    }

    public function testUserCanNotDeleteOtherUserSurvey()
    {
        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        Airlock::actingAs($user2);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $response = $this->delete('/api/surveys/' . $survey->id);
        $response->assertStatus(401);
    }

    public function testAdminCanDeleteAnySurvey()
    {
        $user = factory(User::class)->create();
        $admin = factory(User::class)->state('admin')->create();
        Airlock::actingAs($admin);

        $survey = factory(Survey::class)->state('token')->create([
            'user_id' => $user->id,
        ]);

        $response = $this->delete('/api/surveys/' . $survey->id);
        $response->assertStatus(200);

        $this->assertDatabaseMissing('surveys', $survey->toArray());
    }
}
