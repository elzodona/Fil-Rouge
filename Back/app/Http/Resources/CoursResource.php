<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\AnneeSemestreResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CoursResource extends JsonResource
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
            'time' => $this->time,
            'time_restant' => $this->time_restant,
            'annee_semestre_id' => AnneeSemestreResource::make($this->annee_semestre),
            'prof_id' => $this->prof,
            'module_id' => $this->module,
            'etat' => $this->etat,
            'session' => SessionCourResource::collection($this->session_cour)
        ];
    }
    
}
