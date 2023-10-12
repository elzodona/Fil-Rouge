<?php

use App\Models\Module;
use App\Models\AnneeSemestre;
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
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->float('time');
            $table->foreignIdFor(AnneeSemestre::class)->constrained();
            $table->foreignId('prof_id')->constrained('users');
            $table->foreignIdFor(Module::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
