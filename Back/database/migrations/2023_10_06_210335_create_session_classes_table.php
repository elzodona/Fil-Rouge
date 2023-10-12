<?php

use App\Models\Classe;
use App\Models\SessionCour;
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
        Schema::create('session_classes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Classe::class)->constrained();
            $table->foreignIdFor(SessionCour::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('session_classes');
    }
};
