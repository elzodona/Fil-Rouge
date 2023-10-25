<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\SessionClasseResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionCourResource extends JsonResource
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
            'date_session' => $this->date_session,
            'started_at' => $this->started_at,
            'finished_at' => $this->finished_at,
            'duration' => $this->duration,
            'etat' => $this->etat,
            'canceled' => $this->canceled,
            'cour'=> $this->cour,
            'motif' => $this->motif,
            'prof' => $this->cour->prof->name,
            'module' => $this->cour->module->libelle,
            'salle' => $this->salle,
            'classes' => $this->classes,
        ];
    }
}
