<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupmembers extends Model
{
    use HasFactory;

    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'group_id',
      'user_id',
      'grouprole',
      'is_active'
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
