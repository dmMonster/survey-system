<?php

namespace App\Http\Requests;

use App\Survey;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSurvey extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $surveyAuthor = Survey::select('user_id')->where('id', $this->route('id'))->first()->user_id;
        if(Auth::user()->checkAdmin() !== true && Auth::id() !== intval($surveyAuthor)){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' =>['string', 'max:255', 'required'],
            'description' =>['string', 'max:255', 'required'],
            'end_date' => ['date_format:Y-m-d H:i:s', 'required'],
            'id' => ['exists:surveys'],
        ];
    }

    public function validationData()
    {
        return array_merge($this->request->all(), [
            'id' => $this->route('id'),
        ]);
    }

    public function messages()
    {
        return [
            'id.exists' => 'Survey does not exist.',
        ];
    }
}
