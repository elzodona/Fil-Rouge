<?php

namespace App\Http\Controllers;

use App\Models\Cour;
use App\Models\SessionCour;
use App\Models\Module;
use App\Models\User;
use App\Models\Inscription;
use App\Models\Classe;
use Illuminate\Http\Request;
use Carbon\Carbon;
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

    public function annulerSession(Request $request)
    {
        $session = SessionCour::find($request->id);
        $session->update(['canceled' => 'en cours', 'motif' => $request->motif]);

        return response()->json([
            'message' => 'Demande envoyée avec succès !!',
            'session' => $session
        ]);
    }

    public function store(Request $request)
    {
        $cour = Cour::where('prof_id', $request->prof)->where('module_id', $request->module)->where('annee_semestre_id', $request->semestre)->first();

        if ($cour->time_restant == 0) {
            return response()->json([
                'message' => 'Ce cours est terminé'
            ]);
        }

        $date = $request->date;

        $dateAujourdhui = now()->toDateString();
        $heureActuelle = now()->format('H:i:s');

        $heureActu = strtotime('1970-01-01'. ' '. $heureActuelle);

        $start_time = strtotime('1970-01-01'. ' '. $request->start);
        $end_time = strtotime('1970-01-01'. ' '. $request->end);
        
        $minMax = 60 * 60;
        $duration = $end_time - $start_time;

        if ($cour->time_restant < $duration) {
            return response()->json([
                'message' => "La durée de cette session dépasse le nombre d'heures restantes"
            ]);
        }

        // if ($date == $dateAujourdhui) {
        //     if ($start_time <= $heureActu) {
        //         return response()->json(['message' => "L'heure de la session ne doit pas etre antérieur à l'heure actuelle"]);
        //     }
        // }

        if ($end_time < $start_time) {
            return response()->json(['message' => "L'heure de fin doit pas etre antérieur à l'heure de début"]);
        }

        if (($end_time - $start_time) < $minMax) {
            return response()->json(['message' => "Une session doit durer au maximum 1h"]);
        }

        $pro = Cour::where('prof_id', $request->prof)->get();
        
        foreach ($pro as $value) {
            $profDispo = SessionCour::where('cour_id', $value['id'])->where('date_session', $date)->get();
            
            foreach ($profDispo as $key ) {
                if ($start_time == $key->started_at) {
                    return response()->json([
                        'message' => 'Ce prof a déjà un cours qui commence à cette heure de début',
                    ]);
                }
                if ($start_time > $key->started_at && $start_time < $key->finished_at) {
                    return response()->json([
                        'message' => 'Ce prof a déjà un cours à cet heure',
                    ]);
                }
                if ($end_time < $key->finished_at && $end_time > $key->start_time) {
                    return response()->json([
                        'message' => 'Ce prof a déjà un cours à cet heure',
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

    public function destroy($id)
    {
        $session = SessionCour::where('id', $id)->first();
        $session->delete();
        return response()->json([
            'message' => 'session supprimé avec succès'
        ]);
    }

    public function getElevesByClasse(Request $request)
    {
        $eleves = [];
        $inscriptions = [];
        foreach ($request->classes as $value) {
            $classe = Classe::where('id', $value)->first();
            $insc = Inscription::where('classe_id', $classe->id)->get();
            if (count($insc) > 0) {
                $inscriptions = array_merge($inscriptions, $insc->pluck('eleve_id')->toArray());
            }
        }
        foreach ($inscriptions as $value) {
            $eleve = User::where('id', $value)->first();
            $eleves [] = $eleve;
        }
        return $eleves;
    }

    public function sessionAValider()
    {
        $dateAujourdhui = now()->toDateString();
        $sessionsEnCours = SessionCour::where('validé', 'pas encore')
        ->where('date_session', $dateAujourdhui)
            ->get();
        // dd($sessionsEnCours);
        $heureActuelle = now();
        $tab = [];
        foreach ($sessionsEnCours as $session) {
            $heureFin = gmdate('H:i:s', $session->finished_at);

            $heureFinCarbon = Carbon::createFromFormat('H:i:s', $heureFin);
            $differenceEnMinutes = $heureActuelle->diffInMinutes($heureFinCarbon);
            // dd($differenceEnMinutes);
            if ($differenceEnMinutes > 5) {
                $tab[] = $session;
            }
        }
        return response()->json(SessionCourResource::collection($tab));

    }

    public function valider(Request $request)
    {
        $session = SessionCour::find($request->id);
        $session->update(['validé' => 'oui']);

        return response()->json([
            'message' => 'Session validée avec succès !!',
        ]);
    }

    public function invalider(Request $request)
    {
        $session = SessionCour::find($request->id);
        $session->update(['validé' => 'non']);

        return response()->json([
            'message' => 'Session validée avec succès !!',
            'session' => $session
        ]);
    }
}
