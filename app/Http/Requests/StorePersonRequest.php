<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePersonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'first_name' => $this->normalizeName($this->input('first_name')),
            'last_name' => $this->normalizeName($this->input('last_name')),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [];
    }

    private function normalizeName(mixed $value): mixed
    {
        if (! is_string($value)) {
            return $value;
        }

        $normalized = preg_replace('/\s+/u', ' ', trim($value));

        if (! is_string($normalized)) {
            return $value;
        }

        $normalized = mb_strtolower($normalized, 'UTF-8');

        return preg_replace_callback(
            "/(^|[\\s\-'])(\\p{L})/u",
            static fn (array $matches): string => $matches[1].mb_strtoupper($matches[2], 'UTF-8'),
            $normalized,
        );
    }
}
