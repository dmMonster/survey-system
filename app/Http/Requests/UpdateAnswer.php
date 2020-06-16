<?php

namespace App\Http\Requests;

use App\Question;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateAnswer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $question = Question::where('id', $this->route('questionId'))->first();
        if (is_null($question) || intval($question->survey->user_id) === Auth::id() || Auth::user()->checkAdmin()) {
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
            'answers' => 'required',
            'answers.*' => 'string|max:255|required',
            'question_id' => 'exists:questions,id',
        ];
    }

    public function validationData()
    {
        return array_merge($this->request->all(), [
            'question_id' => $this->route('questionId'),
        ]);
    }
}
