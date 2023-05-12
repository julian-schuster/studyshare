<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupmessages extends Model
{
    use HasFactory;

    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'message'
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
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
