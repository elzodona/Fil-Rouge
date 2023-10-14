<?php

namespace App\Models;

use App\Models\Cour;
use App\Models\Salle;
use App\Models\Classe;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SessionCour extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'session_classes', 'session_cour_id', 'classe_id');
    }

    public function salle()
    {
        return $this->belongsTo(Salle::class);
    }

    public function cour()
    {
        return $this->belongsTo(Cour::class);
    }

}
