<?php

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
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone', 20);
            $table->date('dob')->nullable();
            $table->string('gender', 10)->nullable();
            $table->string('department', 100)->nullable();
            $table->string('proficiency', 100)->nullable();
            $table->string('destination', 100)->nullable();
            $table->string('address', 500)->nullable();
            $table->decimal('sscGpa', 3, 2)->nullable();
            $table->decimal('hscGpa', 3, 2)->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
