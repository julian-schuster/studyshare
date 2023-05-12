<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model {

    use HasFactory;


    /**
     * Defines the Notification Types
     */
    const GROUP_INVITE = 1;
    const GROUP_MSG = 2;
    const GROUP_FILE_UPLOAD = 3;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'receiver_id',
        'sender_id',
        'notification_type',
        'notification_msg',
        'notification_read'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

}
