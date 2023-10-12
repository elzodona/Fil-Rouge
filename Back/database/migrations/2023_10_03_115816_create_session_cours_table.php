<?php

use App\Models\Salle;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('session_cours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->dateTime('date_created');
            $table->string('started_at');
            $table->string('finished_at');
            $table->string('duration');
            $table->foreignIdFor(Salle::class)->constrained();
            $table->enum('etat', ['done', 'in_progress']);
            $table->enum('canceled', ['yes', 'no', 'not_yet']);
            $table->foreignId('attach_id')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_cours');
    }
};
