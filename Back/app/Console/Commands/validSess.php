<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SessionCour;
use Carbon\Carbon;

class validSess extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:valid-sess';

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
            if ($differenceEnMinutes == 5) {
                $tab[] = $session;
            }
        }
        dd($tab);
    }

}
