<?php

use App\Models\Module;
use App\Models\Filiere;
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
        Schema::create('filiere_modules', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Module::class)->constrained();
            $table->foreignIdFor(Filiere::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filiere_modules');
    }
};
