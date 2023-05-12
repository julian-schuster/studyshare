<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Groupmember extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

      if ($this->grouprole == 'owner'){
        // 0 is owner
        $this->grouprole = 0;
      } else if ($this->grouprole == 'member'){
        // 1 is member
        $this->grouprole = 1;
      }

      return [
          'userid' => $this->id,
          'firstname' => $this->firstname,
          'lastname' => $this->lastname,
          'role' => $this->grouprole,
          'joinedAt' => $this->created_at,
      ];
        // return parent::toArray($request);
    }
}
