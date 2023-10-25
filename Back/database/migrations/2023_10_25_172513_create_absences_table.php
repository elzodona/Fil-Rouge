<?php

use App\Models\SessionCour;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->datetime('date_absence');
            $table->foreignId('eleve_id')->constrained('users');
            $table->foreignIdFor(SessionCour::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absences');
    }
};
