<?php

namespace App\Policies;

use App\Survey;
use App\User;

class SurveyRatingPolicy
{
    public function viewAny(User $user, int $surveyId): bool
    {
        return Survey::where('id', $surveyId)->first()['user_id'] == $user['id'] || $user->checkAdmin();
    }

}
