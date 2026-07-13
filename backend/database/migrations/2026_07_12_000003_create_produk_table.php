<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->integer('harga');
            $table->string('tag', 50)->default('');
            $table->string('kategori', 100);
            $table->string('subkategori', 100)->nullable()->default('');
            $table->string('gambar', 500)->nullable();
            $table->text('deskripsi')->nullable();
            $table->boolean('arsip')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produk');
    }
};
