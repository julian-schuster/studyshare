<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use App\Rules\UniqueRegisterEmail;

class RegisterController extends Controller {

  /**
   * Register a new user
   * stores a new user resource
   * @param  \Illuminate\Http\Request $request
   */
    public function registerUser(Request $request) {

        //Validating Inputs//
        $loginrules = [
            'password' => ['required','min:6','max:30','confirmed'],
            'email' => ['email',"regex:^.*.hs-fulda.*$^", new UniqueRegisterEmail()],
        ];
        //Custom Validation Error-Messages
        $login_validation_msg = [
            'password.required' => 'Please enter a password',
            'password.min' => "Please enter atleast 6 characters for your password",
            'password.max' => "Please enter less then 31 characters for your password",
            'password_confirmation.confirmed' => "Passwords do not match",
            'email.email' => 'Please Enter a valid E-Mail',
            'email.regex' => "Please use an offical HS Fulda Email"
        ];

        $validator = Validator::make($request->all(), $loginrules, $login_validation_msg);

        if ($validator->fails()) {


            return response()->json($validator->messages(), 403);
        }

        //if Validation passes proceed with Generating Tokens

        $logintoken = Str::random(30);

        $email_split = explode("@", $request->input('email'));

        $username = explode(".", $email_split[0]);

        $firstname = ucwords($username[0]);

        $lastname = ucwords($username[1]);

        //Adding a new User to the DB
        $user = new User();
        $user->firstname = $firstname;
        $user->lastname = $lastname;
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->logintoken = Hash::make($logintoken);
        $user->logintoken_expire_at = Carbon::now("Europe/Berlin")->addMinutes(User::LOGINSESSION_DURATION);

        $user->save();

        return response()->json([
                    'id' => $user->id,
                    'login_token' => $logintoken,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname
                        ], 200);
    }

    /**
     * Unregister a new user
     * deletes an user resource
     * @param  \Illuminate\Http\Request $request
     */
    public function unRegisterUser(Request $request) {
        $email = $request->input('email');
        $logintoken = $request->input('logintoken');

        //Check if it is really the user that want to unregister
        if ($logintoken == User::where('email', $email)->value('logintoken')) {
            $deletedRows = User::where('email', $email)->delete();
        }
    }

}
