<?php

namespace App\Console\Commands;

use App\Models\SessionCour;
use Illuminate\Console\Command;

class UpdateSession extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-session';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dateAujourdhui = now()->toDateString();
        $sessionsEnCours = SessionCour::where('etat', 'in_progress')
                                ->where('date_session', $dateAujourdhui)
                                ->get();
        // dd($sessionsEnCours);
        foreach ($sessionsEnCours as $session) {
            $heureActuelle = now()->format('H:i:s');

            $heureDebut = gmdate('H:i:s', $session->started_at);
            $heureFin = gmdate('H:i:s', $session->finished_at);

            if ($heureActuelle > $heureFin) {
                $session->etat = 'done';
                $session->save();
            }
        }
    }


}
