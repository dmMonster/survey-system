<?php

namespace App\Policies;

use App\Survey;
use App\User;

class SurveyRatingPolicy
{
    public function viewAny(User $user, int $surveyId): bool
    {
        dd(Survey::where('id', $surveyId)->first()['id']);
        return Survey::where('id', $surveyId)->first()['id'] === $user['id'] || $user->checkAdmin();
    }

}
