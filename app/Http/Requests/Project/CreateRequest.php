<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', Rule::unique('projects', 'name')->ignore($this->project)],
            'budget' => ['sometimes', 'numeric'],
            // 'start_at' => ['sometimes', 'date'],
            // 'end_at' => ['sometimes', 'date'],
            'properties' => ['sometimes', 'array'],
            'description' => ['nullable', 'string', 'max:180'],
        ];
    }
}
