<?php

namespace App\Http\Requests;

use App\Question;
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
        $question = Question::find($this->route("questionId"));
        //if question does not exist go to validation and return validation error
        if ($question === null) {
            return true;
        }
        return (intval($question->survey->user_id) === Auth::id() || Auth::user()->checkAdmin());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'answers' => 'required',
            'answers.*' => 'string|max:255|required',
            'question_id' => 'exists:questions,id',
        ];
    }

    /**
     * @return array
     */
    public function validationData()
    {
        return array_merge($this->request->all(), [
            'question_id' => $this->route('questionId'),
            'answers' => json_decode($this->input('answers'), true),
        ]);
    }
}
