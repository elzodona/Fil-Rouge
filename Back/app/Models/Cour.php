<?php

namespace App\Models;

use App\Models\User;
use App\Models\Module;
use App\Models\SessionCour;
use App\Models\AnneeSemestre;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cour extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function prof()
    {
        return $this->belongsTo(User::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function annee_semestre()
    {
        return $this->belongsTo(AnneeSemestre::class);
    }

    public function session_cour()
    {
        return $this->hasMany(SessionCour::class);
    }

}
