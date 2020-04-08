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

    /**
     * A basic feature test example.
     *
     * @return void
     */
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

}
