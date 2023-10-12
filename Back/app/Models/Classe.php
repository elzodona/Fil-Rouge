<?php

namespace App\Models;

use App\Models\Filiere;
use App\Models\SessionCour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classe extends Model
{
    use HasFactory;

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function session_cours()
    {
        return $this->belongsToMany(SessionCour::class, 'session_classes', 'classe_id', 'session_cour_id');
    }
    
}
