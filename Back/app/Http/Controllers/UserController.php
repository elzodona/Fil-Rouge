<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Classe;
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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    

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
        // $eleves = Excel::toCollection(null, $file);
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

    
}
