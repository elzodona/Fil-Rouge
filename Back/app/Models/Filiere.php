<?php

namespace App\Models;

use App\Models\Classe;
use App\Models\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Filiere extends Model
{
    use HasFactory;

    public function module()
    {
        return $this->belongsToMany(Module::class, 'filiere_modules', 'filiere_id', 'module_id');
    }

    public function class()
    {
        return $this->hasMany(Classe::class);
    }
}
