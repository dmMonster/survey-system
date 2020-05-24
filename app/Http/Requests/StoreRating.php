<?php

namespace App\Http\Requests;

use App\Respondent;
use App\Survey;
use App\SurveyRating;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;

class StoreRating extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $respondentId = Respondent::where('ip', $this->ip())->first()->id;
        $surveyId = Survey::where('token', $this->route('token'))->first()->id;
        $surveyRating = SurveyRating::where('survey_id', $surveyId)->where('respondent_id', $respondentId)->first();
        if ($surveyRating === null) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'rating' => ['required', 'integer', 'between:1,10'],
            'description' => ['string', 'nullable']
        ];
    }

    protected function failedAuthorization()
    {
        throw new AuthorizationException('You already rated it!');
    }
}
