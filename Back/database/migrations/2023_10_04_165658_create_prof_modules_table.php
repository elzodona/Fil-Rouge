<?php

use App\Models\Module;
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
        Schema::create('prof_modules', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Module::class)->constrained();
            $table->foreignId('prof_id')->constrained('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prof_modules');
    }
};
