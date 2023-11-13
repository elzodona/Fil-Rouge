<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Classe;
use App\Models\Cour;
use App\Models\SessionCour;
use App\Http\Resources\SessionCourResource;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Imports\EtudiantImport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Cookie;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\CoursResource;
use App\Http\Resources\UserResource;
use App\Models\Absence;
use App\Models\SessionClasse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function profs()
    {
        $profs = User::where('role', 'prof')->get();
        return response()->json(UserResource::collection($profs));
    }

     public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
            [
                'email'=> 'required|email',
                'password'=> 'required'

            ]);

            if (!auth()->attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match'
                ], Response::HTTP_UNAUTHORIZED);
            }

            // $user = User::where('email', $request->email)->first();
            $user = Auth::user();
            $token = $user->createToken("API TOKEN")->plainTextToken;
            $cookie = cookie("token", $token, 24*60);

            return response()->json([
                'status' => true,
                'message' => 'User logged in succesfully',
                'token' => $token,
                'user' => $user
            ])->withCookie($cookie);

        } catch (\Throwable $th) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $th->getMessage(),
                ], Response::HTTP_UNAUTHORIZED
            );
        }
    }

    public function logout(Request $request)
    {
        //dd(Auth::user());

        Auth::guard('sanctum')->user()->tokens()->delete();
        Cookie::forget("token");

        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }

    public function createUser(StoreUserRequest $request)
    {
        //$this->authorize('create', User::class);
       // dd(auth()->user()->role);
       // dd (auth()->user()->can('create', User::class));
        try {

            $imagePath = str_replace('data:image/jpeg;base64,', '', $request->photo);
            $fileName = $request->photo_name;
            Storage::disk('public')->put($fileName, base64_decode($imagePath));

            $user = User::create([
                'name' => $request->validated()['name'],
                'email' => $request->validated()['email'],
                'password' => $request->validated()['password'],
                'role' => $request->validated()['role'],
                'specialite' => $request->specialite,
                'photo' => $fileName,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User create successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
            ], Response::HTTP_CREATED);

        } catch (\Throwable $th) {
            return response()->json(
                [
                    'status' => false,
                    'message' => $th->getMessage(),
                ], 500
            );
        }
    }

    public function deleteUser($userId)
    {
        $this->authorize('delete', User::class);

        $user = User::findOrFail($userId);
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'User supprimé avec succès',
            'user' => $user
        ]);
    }

    public function import(Request $request)
    {
        $file = $request->file('file');
        $eleves = Excel::toArray(new EtudiantImport, $file);
        // $eleves = Excel::import(new EtudiantImport, $file);
        // return $eleves;

        foreach ($eleves as $eleveData) {
            foreach ($eleveData as $data) {
                $eleve = (new EtudiantImport)->model($data);
                $eleve->save();

                $eleveId = $eleve->id;

                Inscription::create([
                    'eleve_id' => $eleveId,
                    'classe_id' => $request->classe_id,
                    'annee_id' => $request->annee_id,
                ]);
                $classe = Classe::where('id', $request->classe_id)->first();
                $classe->increment('effectif');
            }
        }

        return response()->json([
            'message' => 'Elèves créés avec succès !!!'
        ]);
    }

    public function getNotif()
    {
        $sessions = SessionCour::where('canceled', 'en cours')->get();
        return SessionCourResource::collection($sessions);
    }

    public function responseDemande(Request $request)
    {
        $session = SessionCour::find($request->id);
        $session->update(['canceled'=>$request->res]);
        return response()->json([
            'message' => 'Réponse envoyée avec succès !!'
        ]);
    }

    public function coursStudent($id)
    {
        $elId = User::where('id', $id)->first()->id;
        $clasId = Inscription::where('eleve_id', $elId)->first()->classe_id;
        $sessions = SessionClasse::where('classe_id', $clasId)->get();
        $sesId = $sessions->pluck('session_cour_id')->unique()->values();
        // return $sesId;

        $cours = [];
        foreach ($sesId as $value) {
            $ses = SessionCour::where('id', $value)->first();
            if ($ses) {
                $cours[] = $ses->cour_id;
            }
        }
        $coursSansDoublons = array_unique($cours);
        $coursSansDoublons = array_values($coursSansDoublons);
        // return $coursSansDoublons;

        $allCours=[];
        foreach ($coursSansDoublons as $value) {
            $c = Cour::where('id', $value)->first();
            $allCours[]=new CoursResource($c);
        }
        return $allCours;

    }

    public function sessionDone($id)
    {
        $dateAujourdhui = now()->toDateString();
        $sessionsEnCours = SessionCour::where('validé', 'pas encore')
        ->where('date_session', $dateAujourdhui)
            ->get();
        // dd($sessionsEnCours);
        $heureActuelle = now();
        $tab = [];
        foreach ($sessionsEnCours as $session) {
            $heureDebut = gmdate('H:i:s', $session->started_at);

            $heureFinCarbon = Carbon::createFromFormat('H:i:s', $heureDebut);
            $differenceEnMinutes = $heureActuelle->diffInMinutes($heureFinCarbon);
            // dd($differenceEnMinutes);

            $already = Absence::where('eleve_id', $id)->where('session_cour_id', $session->id)->first();
            if (!$already) {
                if ($differenceEnMinutes >= 30) {
                    $tab[] = $session;
                }
            }
        }
        return response()->json(SessionCourResource::collection($tab));
    }

    public function sessionEnCours($id)
    {
        $dateAujourdhui = now()->toDateString();
        $sessionsEnCours = SessionCour::where('validé', 'pas encore')
        ->where('date_session', $dateAujourdhui)
            ->get();
        $heureActuelle = now();
        $tab = [];
        foreach ($sessionsEnCours as $session) {
            $heureDebut = gmdate('H:i:s', $session->started_at);
            $heureFin = gmdate('H:i:s', $session->finished_at);

            $heureFinCarbon = Carbon::createFromFormat('H:i:s', $heureDebut);
            $heureFinCarbon = Carbon::createFromFormat('H:i:s', $heureFin);

            if ($heureDebut > $heureActuelle && $heureFin < $heureActuelle) {
                $tab[]=$session;
            }

        }
        return $tab;
    }

    public function getAbsences($id)
    {
        $elId = User::where('id', $id)->first()->id;
        $clasId = Inscription::where('eleve_id', $elId)->first()->classe_id;
        $sessions = SessionClasse::where('classe_id', $clasId)->get();
        $sesId = $sessions->pluck('session_cour_id')->unique()->values();
        // return $sesId;

        $sess = [];
        foreach ($sesId as $value) {
            $ses = SessionCour::where('id', $value)->first();
            if ($ses) {
                $sess[] = new SessionCourResource($ses);
            }
        }
        // return $sess;
        $absences=[];
        foreach ($sess as $value) {
            $already = Absence::where('eleve_id', $id)->where('session_cour_id', $value->id)->first();
            if (!$already) {
                $absences [] = new SessionCourResource($value);
            }
        }
        return $absences;
    }

    public function numAbsences($id)
    {
        $absences = $this->getAbsences($id);
        $duree=0;
        // return $absences;
        foreach ($absences as $value) {
            $duree += +$value->duration;
        }
        return $duree;
    }

    public function getElevesByClasses($id)
    {
        $insc = Inscription::where('classe_id', $id)->get();
        $eleves = $insc->pluck('eleve_id');
        // return $eleves;
        $el=[];
        foreach ($eleves as $value) {
            $el [] = User::where('id', $value)->first();
        }
        return $el;
    }
}
