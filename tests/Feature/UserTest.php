<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Laravel\Airlock\Airlock;

class UserTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testAdminGetUsersList()
    {
        Airlock::actingAs(factory(User::class)->state("admin")->make());

        $users = factory(User::class, 10)->create();
        $response = $this->get('/api/users');

        $response->assertSuccessful()
            ->assertJson([
                $users[0]->toArray(),
            ]);
    }

    public function testUnauthorizedUserGetUserList()
    {
        $response = $this->get('/api/users');

        $response->assertStatus(401);
    }
}
