<?php

namespace App\Http\Requests;

use App\Question;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateQuestion extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $question = Question::where('id', $this->route('id'))->first();
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
            'id' => 'exists:questions,id',
            'question_text' => 'required|string|max:255',
            'type' => 'required|in:multiple-choice,single-choice,text',
        ];
    }

    public function validationData()
    {
        return array_merge($this->request->all(), [
            'id' => $this->route('id'),
        ]);
    }
}
