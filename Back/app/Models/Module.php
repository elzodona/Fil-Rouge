<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;

    public function filiere()
    {
        return $this->belongsToMany(Filiere::class, 'filiere_modules', 'module_id', 'filiere_id');
    }

    public function prof()
    {
        return $this->belongsToMany(User::class, 'prof_modules', 'module_id', 'prof_id');
    }

}
