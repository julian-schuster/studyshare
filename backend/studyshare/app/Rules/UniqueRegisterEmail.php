<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\User;

class UniqueRegisterEmail implements Rule {

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct() {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value) {



        $EmailResult = User::where("email", "=", $value)->doesntExist();


        return $EmailResult;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message() {
        return 'The E-Mail is already taken!';
    }

}
