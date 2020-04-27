<?php

namespace App\Http\Requests;

use App\Survey;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;

class StoreResult extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $end_datetime = Survey::where('id', $this->input('survey_id'))->firstOrFail()->end_date;
        if(time() < strtotime($end_datetime)) {
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
            'survey_id' => ['numeric', 'required', 'exists:surveys,id'],
            'question_ids' => ['exists:questions,id'],
            'responses' => ['array', 'required'],
            'responses.answerIds.*' => ['numeric'],
            'responses.answerText' => ['string'],
        ];
    }

    public function validationData()
    {
        return array_merge($this->request->all(), [
            'question_ids' => array_keys($this->request->get('responses')),
        ]);
    }

    protected function failedAuthorization()
    {
        throw new AuthorizationException('The survey is over.');
    }
}
