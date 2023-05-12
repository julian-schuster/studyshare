<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\NotificationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * The controller namespace for the application.
 *
 * When present, controller route declarations will automatically be prefixed with this namespace.
 *
 * @var string|null
 */


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/register", [RegisterController::class,"registerUser"]);
Route::post("/unregister", [RegisterController::class,"unRegisterUser"])->middleware('validatetoken');

// Login API
Route::post("/login", [LoginController::class,"loginUser"]);
Route::post("/logout", [LoginController::class,"logoutUser"])->middleware('validatetoken');
// Group APIs
Route::get("/group/getlist", [GroupController::class,"getGroupList"])->middleware('validatetoken');
Route::get("/group/nomemberlist", [GroupController::class,"getGroupListNoMember"])->middleware('validatetoken');
Route::get("/group/files", [GroupController::class,"getGroupFiles"])->middleware('validatetoken');
Route::get("/group/details", [GroupController::class,"getGroupDetails"])->middleware('validatetoken');
Route::post("/group/create", [GroupController::class,"createGroup"])->middleware('validatetoken');
Route::delete("/group/delete", [GroupController::class,"deleteGroup"])->middleware('validatetoken');
Route::delete("/group/deletefile", [GroupController::class,"deleteFile"])->middleware('validatetoken');
Route::post("/group/invite", [GroupController::class,"inviteGroup"])->middleware('validatetoken');
Route::post("/group/join", [GroupController::class,"joinGroup"])->middleware('validatetoken');
Route::put("/group/decline", [GroupController::class,"declineInvite"])->middleware('validatetoken');
Route::delete("/group/leave", [GroupController::class,"leaveGroup"])->middleware('validatetoken');

Route::get("/group/files",[GroupController::class,"getGroupFiles"])->middleware('validatetoken');
Route::get("/group/{groupid}/{fileid}",[GroupController::class,"downloadGroupFiles"])->middleware('validatetoken');
Route::post("inventory/publish",[GroupController::class,"publishGroupFiles"])->middleware('validatetoken');

Route::get("/getuser",[GroupController::class,"searchUser"])->middleware('validatetoken');

// Notification APIs
Route::delete("/notification",[NotificationController::class,"deleteNotification"])->middleware('validatetoken');
Route::get("/notifications",[NotificationController::class,"getAllNotifications"])->middleware('validatetoken');
Route::get("/notification",[NotificationController::class,"getSpecificNotification"])->middleware('validatetoken');
Route::put("/notification",[NotificationController::class,"updateNotification"])->middleware('validatetoken');

//Files API
Route::get("/files",[FileController::class,"getFileList"])->middleware('validatetoken');
Route::get("/files/download/",[FileController::class,"downloadFile"])->middleware('validatetoken');
Route::post("/files",[FileController::class,"store"])->middleware('validatetoken');
Route::delete("/files",[FileController::class,"destroy"])->middleware('validatetoken');
