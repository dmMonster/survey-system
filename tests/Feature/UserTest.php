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



    public function testAdminCanGetSpecificUser()
    {
        Airlock::actingAs(factory(User::class)->state("admin")->make());
        $user = factory(User::class)->create();

        $response = $this->get('/api/users/'.$user->id);

        $response->assertSuccessful()
            ->assertJson([
                $user->toArray(),
            ]);
    }

    public function testAdminCanUpdateUser() {
        Airlock::actingAs(factory(User::class)->state("admin")->make());

        $user = factory(User::class)->create();

        $this->put('api/users/'.$user->id,[
            'name' => "test",
            'email' => "test@test.email",
            'is_admin' => true,
        ])->assertSuccessful();

        $this->assertDatabaseHas('users',[
            'name' => "test",
            'email' => "test@test.email",
            'is_admin' => 1,
        ]);

    }

    public function testAdminCanUpdateUserInvalidData() {
        Airlock::actingAs(factory(User::class)->state("admin")->make());

        $user = factory(User::class)->create();

        $this->put('api/users/'.$user->id,[
            'name' => "",
            'email' => "badMail",
            'is_admin' => "not",
        ])->assertStatus(400);


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

    public function testUnauthorizedUserCannotDeleteAccount()
    {
        $user = factory(User::class)->create();

        $response = $this->delete('/api/users/' . $user->id);

        $response->assertStatus(401);
    }

    public function testUserCannotDeleteOtherUser()
    {
        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();

        Airlock::actingAs($user);

        $response = $this->delete('/api/users/' . $user2->id);
        $response->assertStatus(403);

        $this->assertDatabaseHas('users', [
            'id' => $user2->id,
        ]);
    }

    public function testAdminCannotDeleteLastAdminAccount()
    {
        $admin = factory(User::class)->state('admin')->create();
        Airlock::actingAs($admin);

        $response = $this->delete('/api/users/' . $admin->id);

        $this->assertDatabaseHas('users', [
            'id' => $admin->id,
            'is_admin' => true,
        ]);

        $response->assertStatus(403);
    }
}


