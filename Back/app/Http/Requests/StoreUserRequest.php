<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'role' => 'required|in:respo,eleve,attach,prof',
                'photo' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'le nom est requis',
            'email.required' => "l'email est requis",
            'email.email' => "le format de l'email est invalide",
            'email.unique' => "l'email existe déjà",
            'password.required' => 'le password est requis',
            'role.required' => 'le role est requis',
            'role.enum' => 'le role est introuvable',
            'photo.required' => 'le photo est requis',
        ];
    }
}
