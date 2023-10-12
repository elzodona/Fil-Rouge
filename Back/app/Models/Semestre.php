<?php

namespace App\Models;

use App\Models\Annee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Semestre extends Model
{
    use HasFactory;

    public function annee()
    {
        return $this->belongsToMany(Annee::class, 'annee_semestres', 'semestre_id', 'annee_id');
    }
}
