<?php

namespace App\Models;

use App\Models\Semestre;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Annee extends Model
{
    use HasFactory;

    public function semestre()
    {
        return $this->belongsToMany(Semestre::class, 'annee_semestres', 'annee_id', 'semestre_id');
    }
}
