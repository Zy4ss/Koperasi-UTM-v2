<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pengurus', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->string('jabatan', 100);
            $table->string('foto')->nullable();
            $table->integer('level')->default(3); // 1 = Ketua, 2 = Pengurus Inti (BPH), 3 = Sie/Divisi
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengurus');
    }
};
