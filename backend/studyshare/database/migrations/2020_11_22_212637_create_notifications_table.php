<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("receiver_id");
            $table->unsignedBigInteger("sender_id");
            $table->unsignedBigInteger("group_id");
            $table->Integer("notification_type");
            $table->Text("notification_msg")->nullable();
            $table->boolean("notification_read")->default('0');
            $table->timestamps();

            $table->foreign('receiver_id')->references('id')->on('users');
            $table->foreign('sender_id')->references('id')->on('users');
            $table->foreign('group_id')->references('id')->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('notifications');
    }

}
