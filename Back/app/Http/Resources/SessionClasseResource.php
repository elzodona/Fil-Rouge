<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\ClasseResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionClasseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'classe' => $this->classe,
            'session' => $this->session_cours
        ];
    }
}
