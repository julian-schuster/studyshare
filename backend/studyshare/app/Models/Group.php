<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'groupowner_id',
      'groupname',
      'file_limit',
      'file_size_limit',
      'is_public'
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
