<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groupfiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id');
            $table->unsignedBigInteger('file_id');
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('groups');
            // $table->foreign('file_id')->references('id')->on('files'); SCHMEIßT NOCH EINE EXCEPTION BEI MIGRATE

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groupfiles');
    }
}
