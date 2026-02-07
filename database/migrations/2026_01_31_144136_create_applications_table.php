<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            // We store the job details directly here for simplicity, 
            // or you can reference a 'jobs' table with a foreign key.
            $table->unsignedBigInteger('job_id'); 
            $table->string('job_title');
            
            // Applicant Details
            $table->string('email'); // We link users via email
            $table->string('phone_number')->nullable();
            $table->string('education')->nullable();
            
            // Status: Submitted, Under Review, Hired, Rejected
            $table->string('status')->default('Submitted'); 
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};