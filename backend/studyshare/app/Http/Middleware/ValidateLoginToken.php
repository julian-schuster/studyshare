<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use \Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class ValidateLoginToken {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {

        $logintoken     = $request->input('logintoken');
        $userID         = $request->input('userid');
        $user           = User::where('id', $userID)->first();

        if ($user) {
  
            $HasValidLoginToken = Hash::check($logintoken, $user->logintoken);

            if ($HasValidLoginToken) {

                $now = Carbon::now("Europe/Berlin");

                if ($user->logintoken_expire_at > $now) {

                    return $next($request);
                } else {

                    $user->logintoken = NULL;
                    $user->logintoken_expire_at = NULL;
                    $user->save();

                    return redirect()-> back();
                }
            }
            else{
                return response()->json(["error"=>"Access denied. Logintoken invalid!","status" => 403]);
            }
        }

        else{
            return response()->json(["error"=>"Access denied. User not found, wrong ID","status" => 403]);
        }

    }

}
