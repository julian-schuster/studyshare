<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class LoginController extends Controller
{

  /**
   * Login the user
   * sets or updates the logintoken and logintoken expire date in an user resource
   * @param  \Illuminate\Http\Request $request
   */
  public function loginUser(Request $request) {

    $email = $request->input('email');
    $password = $request->input('password');
    $logintoken = Str::random(30);

    $user = User::where('email', $email)->first();

    if ($user) {

      $password_check = Hash::check($password, $user->password);

      if ($password_check) {
        $user->logintoken = Hash::make($logintoken);
        $user->logintoken_expire_at = Carbon::now("Europe/Berlin")->addMinutes(User::LOGINSESSION_DURATION);
        $user->save();

        return response()->json([
                    'id' => $user->id,
                    'login_token' => $logintoken,
                    'firstname'=>$user->firstname,
                    'lastname' => $user->lastname
        ]);
      } else {
        return response()->json([
                    'error' => 'Incorrect password.'
        ], 403);
      }
    } else {
        return response()->json([
                    'error' => 'User not found.'
        ], 403);
    }

  }

  /**
   * Logout a user
   * updates a user resource - sets the logintoken expire date to now (expired) 
   * @param  \Illuminate\Http\Request $request
   */
  public function logoutUser(Request $request) {
    $userID = $request->input('userid');

    $user = User::where('id', $userID)->first();

    // Check if a user with the given ID exists
    if(!$user)
    {
      return response()->json([
        'error' => 'There was an error while trying to logout the user!'
      ]);
    }

    // Logout user using the token
    $now = Carbon::now("Europe/Berlin");
    //$user->logintoken = '';
    $user->logintoken_expire_at = $now;
    $user->save();

    return response()->json([
      'success' => 'User was successfully logged out!'
    ]);
  }
}
