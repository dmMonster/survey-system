<?php

namespace App\Http\Requests;

use App\Survey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreQuestion extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $survey = Survey::where("id", $this->route("id"))->firstOrFail();
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
            'question_text' => 'required|string|max:255',
            'type' => 'required|in:multiple-choice,single-choice,text',
        ];
    }
}
