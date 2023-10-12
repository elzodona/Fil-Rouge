<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\User;
use App\Models\Module;
use App\Models\ProfModule;
use App\Models\FiliereModule;
use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getMod($id)
    {
        $cours = Cour::where('annee_semestre_id', $id)->get();
        $id = $cours->pluck('module_id');
        $tabModule = [];
        foreach ($id as $value) {
            $module = Module::find($value);
            $tabModule[] = $module;
        }

        return $tabModule;
    }

    public function searchModule($id)
    {
        $assoc = FiliereModule::where('filiere_id', $id)->get()->pluck('module_id');
        // return $assoc;
        $tabMod = [];
        foreach ($assoc as $value) {
            $mod = Module::where('id', $value)->first();
            $tabMod[] = $mod;
        }
        return $tabMod;
    }

    public function getProf($id)
    {
        $assoc = ProfModule::where('module_id', $id)->get()->pluck('prof_id');
        $tabProf = [];
        foreach ($assoc as $value) {
            $prof = User::where('id', $value)->first();
            $tabProf[] = $prof;
        }
        return $tabProf;
    }

    public function searchProf($sm, $id)
    {
        $cour = Cour::where('module_id', $id)->where('annee_semestre_id', $sm)->get()->pluck('prof_id');

        $tabProf = [];
        foreach ($cour as $value) {
            $prof = User::where('id', $value)->first();
            $tabProf[] = $prof;
        }
        return $tabProf;
    }

    public function filMod($fil, $mod)
    {
        $test = FiliereModule::where('filiere_id', $fil)->where('module_id', $mod)->first();
        return $test;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModuleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Module $module)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        //
    }
}
