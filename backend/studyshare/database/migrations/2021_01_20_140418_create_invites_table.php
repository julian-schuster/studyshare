<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("receiver_id");
            $table->unsignedBigInteger("sender_id");
            $table->unsignedBigInteger('invited_group_id');
            //0 = pending; 1 = accepted; 2 = declined
            $table->Text('status')->default("pending");
            $table->timestamps();

            $table->foreign('receiver_id')->references('id')->on('users');
            $table->foreign('sender_id')->references('id')->on('users');
            $table->foreign('invited_group_id')->references('id')->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invites');
    }
}
