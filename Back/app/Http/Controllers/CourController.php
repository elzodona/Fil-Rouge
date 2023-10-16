<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\Salle;
use App\Models\Classe;
use Illuminate\Http\Request;
use App\Models\AnneeSemestre;
use App\Http\Resources\CoursResource;
use App\Http\Resources\ClasseResource;
use App\Http\Requests\StoreCourRequest;
use App\Http\Requests\UpdateCourRequest;

class CourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'cours' => CoursResource::collection(Cour::all()),
            'salles' => Salle::all(),
            'classes' => ClasseResource::collection(Classe::all())
        ]);
    }

    public function getCoursByProfId($prof_id)
    {
        $cours = Cour::where('prof_id', $prof_id)->get();
        return CoursResource::collection($cours);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function hasCours($sm, $mod_id, $prof_id)
    {
        $cours = Cour::where('module_id', $mod_id)->where('annee_semestre_id', $sm)->where('prof_id', $prof_id)->first();
        return $cours;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $hours = intval($request->timing);
        $seconds = $hours * 3600;

        $existingCours = Cour::where('module_id', $request->module)->where('prof_id', $request->prof)->where('annee_semestre_id', $request->semestre)->first();

        if ($existingCours) {
            return response()->json([
                'message' => 'Vous avez déjà planifié ce professeur à ce module dans cet semestre.'
            ]);
        }

        $id = AnneeSemestre::where('semestre_id', $request->semestre)->first()->id;

        $cours = Cour::create([
            'module_id' => $request->module,
            'prof_id' => $request->prof,
            'time' => $seconds,
            'annee_semestre_id' => $id,
            'time_restant' => $seconds
        ]);

        return response()->json([
            'status' => true,
            'message' => 'cours planifié avec succès',
            'cours' => $cours
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cour $cour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cour $cour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourRequest $request, Cour $cour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cour $cour)
    {
        //
    }
}
