<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\SessionCour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SessionClasse extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function session_cours()
    {
        return $this->belongsTo(SessionCour::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
    
}
