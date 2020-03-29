<?php

namespace App\Http\Requests;

use App\Survey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAnswer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $survey = Survey::find($this->route("surveyId"));

        //if survey does not exist go to validation and return validation error
        if($survey === null) {
            return true;
        }
        return ($survey->user->id === Auth::id() || Auth::user()->checkAdmin());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'answer_text' => 'string|max:255',
            'question_id' => 'exists:questions,id',
            'survey_id' => 'exists:surveys,id'
        ];
    }

    /**
     * @return array
     */
    public function validationData()
    {
        return array_merge($this->request->all(), [
            'question_id' => $this->route('questionId'),
            'survey_id' => $this->route('surveyId'),
        ]);
    }
}
