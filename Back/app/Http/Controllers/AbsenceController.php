<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use App\Http\Requests\StoreAbsenceRequest;
use App\Http\Requests\UpdateAbsenceRequest;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function storeAbsence(Request $request)
    {
        $already = Absence::where('eleve_id', $request->eleve_id)->where('session_cour_id', $request->session_cour_id)->first();

        if ($already) {
            return response()->json([
                'message' => 'Vous avez déjà émargé'
            ]);
        }

        Absence::create([
            'date_absence'=>now(),
            'eleve_id'=>$request->eleve_id,
            'session_cour_id'=>$request->session_cour_id
        ]);
        
        return response()->json([
            'message'=>'Absence enregistrée'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Absence $absence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Absence $absence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAbsenceRequest $request, Absence $absence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absence $absence)
    {
        //
    }
}
