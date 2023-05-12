<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("fileownerid");
            $table->string('filename');
            $table->string('filepath');
            $table->string('filetype');
            $table->string('filesize');
            $table->timestamps();
            $table->foreign('fileownerid')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('files');
    }

}
