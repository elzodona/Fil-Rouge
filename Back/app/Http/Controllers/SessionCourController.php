<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\SessionCour;
use App\Models\Module;
use Illuminate\Http\Request;
use App\Http\Resources\SessionCourResource;
use App\Http\Requests\StoreSessionCourRequest;
use App\Http\Requests\UpdateSessionCourRequest;

class SessionCourController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function time($mod, $prof)
     {
        $modId = Module::where('libelle', $mod)->first()->id;
        $time = Cour::where('module_id', $modId)->where('prof_id', $prof)->where('annee_semestre_id', 1)->first();
        return $time;
     }

    public function index()
    {
        return response()->json([
            'sessions' => SessionCourResource::collection(SessionCour::all())
        ]);
    }

    public function sessionByCour($cour)
    {
        $sessions = SessionCour::where('cour_id', $cour)->get();
        return SessionCourResource::collection($sessions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function annulerSession(Request $request)
    {
        $session = SessionCour::find($request->id);
        $session->update(['canceled' => 'en cours', 'motif' => $request->motif]);

        return response()->json([
            'message' => 'Demande envoyée avec succès !!',
            'session' => $session
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $date = $request->date;

        $dateAujourdhui = now()->toDateString();
        $heureActuelle = now()->format('H:i:s');

        $heureActu = strtotime('1970-01-01'. ' '. $heureActuelle);

        $start_time = strtotime('1970-01-01'. ' '. $request->start);
        $end_time = strtotime('1970-01-01'. ' '. $request->end);
        
        $minMax = 60 * 60;
        // return response()->json([$minMax, ($end_time - $start_time)]);

        if ($date == $dateAujourdhui) {
            // return response()->json([$heureActu, $start_time]);
            if ($start_time <= $heureActu) {
                return response()->json(['message' => "L'heure de la session ne doit pas etre antérieur à l'heure actuelle"]);
            }
        }

        if (($end_time - $start_time) < $minMax) {
            return response()->json(['message' => "Une session doit durer au maximum 1h"]);
        }
        
        // return response()->json([$date, $dateAujourdhui]);

        
        $duration = $end_time - $start_time;

        // $duree = date('H:i:s', $duration);
        // return response()->json($duree);

        if ($start_time >= $end_time) {
            return response()->json([
                'message' => "L'heure de fin doit etre postérieur"
            ]);
        }

        $pro = Cour::where('prof_id', $request->prof)->get();
        
        foreach ($pro as $value) {
            $profDispo = SessionCour::where('cour_id', $value['id'])->where('date_session', $date)->get();
            
            foreach ($profDispo as $key ) {
                // return $key->started_at;
                if ($start_time == $key->started_at) {
                    return response()->json([
                        'message' => 'Ce prof n\'est pas disponible',
                    ]);
                }
                if ($start_time > $key->started_at && $start_time < $key->finished_at) {
                    return response()->json([
                        'message' => 'Ce prof n\'est pas disponible',
                    ]);
                }
                if ($end_time < $key->finished_at && $end_time > $key->start_time) {
                    return response()->json([
                        'message' => 'Ce prof n\'est pas disponible',
                    ]);
                }
            }
        }

        $test = SessionCour::where('date_session', $date)->where('salle_id', $request->salle)->get();
        
        if (count($test) > 0) {
            foreach ($test as $value) {
                if ($start_time == $value['started_at']) {
                    return response()->json([
                        'message' => 'Cettte salle n\'est pas disponible',
                    ]);
                }
                if ($start_time > $value['started_at'] && $start_time < $value['finished_at']) {
                    return response()->json([
                        'message' => 'Cettte salle n\'est pas disponible',
                    ]);
                }
                if ($end_time < $value['finished_at'] && $end_time > $value['start_time']) {
                    return response()->json([
                        'message' => 'Cettte salle n\'est pas disponible',
                    ]);
                }
            }
        }

        $cour = Cour::where('prof_id', $request->prof)->where('module_id', $request->module)->where('annee_semestre_id', $request->semestre)->first(); 

        if ($cour->time_restant == 0) {
            return response()->json([
                'message' => 'Ce cours est terminé'
            ]);
        }
        if ($cour->time_restant < $duration){
            return response()->json([
                 'message' => "L'heure est insuffisante"
            ]);
        }

        $session = SessionCour::create([
            'date_session' => $request->date,
            'started_at' => $start_time,
            'finished_at' => $end_time,
            'duration' => $duration,
            'salle_id' => $request->salle ? $request->salle : null,
            'cour_id' => $cour->id
        ]);
        
        $session->classes()->attach($request->classes);
        
        $cour->decrement('time_restant', $duration);

        return response()->json([
            'status' => true,
            'message' => 'Session planifié avec succès',
            'data' => $session
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(SessionCour $sessionCour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SessionCour $sessionCour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionCourRequest $request, SessionCour $sessionCour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SessionCour $sessionCour)
    {
        //
    }
}
