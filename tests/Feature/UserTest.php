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

    public function testAdminCanDeleteUser()
    {
        Airlock::actingAs(factory(User::class)->state("admin")->make());

        $user = factory(User::class)->create();

        $response = $this->delete('/api/users/' . $user->id);

        $response->assertSuccessful();

        $this->assertDatabaseMissing('users', [
            "name" => $user->name,
            "email" => $user->email,
            "is_admin" => $user->is_admin,
        ]);
    }

    public function testUserCannotDeleteOtherUser()
    {
        $user = factory(User::class)->create();

        $response = $this->delete('/api/users/' . $user->id);

        $response->assertStatus(401);
    }
}
