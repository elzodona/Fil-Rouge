<?php

use App\Http\Controllers\AbsenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\SessionCourController;



Route::post('auth/login', [UserController::class, 'loginUser']);

Route::post('auth/register', [UserController::class, 'createUser']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('auth/logout', [UserController::class, 'logout']);
    Route::delete('auth/delete/{userId}', [UserController::class, 'deleteUser']);

    
});

Route::get('mod/{lib}/prof/{id}', [SessionCourController::class, 'time']);

Route::apiResource('filiere', FiliereController::class);

Route::get('module', [ModuleController::class, 'index']);

Route::get('module/{id}', [ModuleController::class, 'getMod']);

Route::get('filiere/{id}/module', [ModuleController::class, 'searchModule']);

Route::get('fil/{fil}/mod/{mod}', [ModuleController::class, 'filMod']);

Route::get('module/{id}/prof', [ModuleController::class, 'getProf']);

Route::get('sm/{sm}/module/{id}/prof', [ModuleController::class, 'searchProf']);

Route::apiResource('cour', CourController::class);

Route::get('prof/{id}/cours', [CourController::class, 'getCoursByProfId']);

Route::get('sm/{sm}/module/{modId}/prof/{profId}', [CourController::class, 'hasCours']);

Route::get('cours/{cour}/sessions', [SessionCourController::class, 'sessionByCour']);

Route::apiResource('session', SessionCourController::class);

Route::delete('session/{id}', [SessionCourController::class, 'delete']);

Route::post('canceledSes', [SessionCourController::class, 'annulerSession']);

Route::post('/import', [UserController::class, 'import']);

Route::get('/profs', [UserController::class, 'profs']);

Route::get('notif', [UserController::class, 'getNotif']);

Route::post('/responseDemande', [UserController::class, 'responseDemande']);

Route::post('eleves', [SessionCourController::class, 'getElevesByClasse']);

Route::get('toValidate', [SessionCourController::class, 'sessionAValider']);

Route::post('valider', [SessionCourController::class, 'valider']);

Route::post('invalider', [SessionCourController::class, 'invalider']);

Route::get('/eleve/{id}/cours', [UserController::class, 'coursStudent']);

Route::get('/eleve/{id}/absences', [UserController::class, 'getAbsences']);

Route::post('/absence', [AbsenceController::class, 'storeAbsence']);

Route::get('eleve/{id}/sessionDone', [UserController::class, 'sessionDone']);

Route::get('/eleve/{id}/absents', [UserController::class, 'numAbsences']);

Route::get('/classe/{id}/eleves', [UserController::class, 'getElevesByClasses']);

Route::get('eleve/{id}/sessionC', [UserController::class, 'sessionEnCours']);



