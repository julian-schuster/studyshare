<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Group;
use App\Models\Invite;
use App\Models\Notification;
use App\Http\Resources\Group as GroupResource;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Groupmember as GroupmemberResource;
use App\Models\File;
use App\Models\Groupfiles;
use App\Models\Groupmembers;
use App\Models\Groupmessages;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class GroupController extends Controller
{

  /**
   * Get a list of all groups the user is part of
   * OR all existing groups (when grouplistuserid is not given)
   * @param  \Illuminate\Http\Request $request
   * @return App\Http\Resources\Group as GroupResource - a collection of groups
   */
  public function getGroupList(Request $request)
  {

    $userID = $request->input('userid');
    $size = $request->input('size');
    $page = $request->input('page');
    $grouplistuserid = $request->input('grouplistuserid');

    //if userID is not empty (delivered in the request(url))
    if (!empty($grouplistuserid && $userID == $grouplistuserid)){
      // Return all entries from specific user
      $groupmember = Groupmembers::where('user_id', "=", $grouplistuserid)->orderBy('created_at', 'desc')->get();
      // count of all groups from specfic user
      $groupcount = count($groupmember);
      //paginate the collection
      $grouplist = Groupmembers::join('groups', 'groups.id', '=', 'groupmembers.group_id')->where('groupmembers.user_id', '=', $userID)->paginate($size);
    } else {
      // Return all entries from all users
      $grouplist = Group::orderBy('created_at', 'desc')->get();
      //count of all groups from specfic user
      $groupcount = count($grouplist);
      //paginate the collection
      $grouplist = Group::orderBy('created_at', 'desc')->paginate($size);
    }

    $retArray = [];

    foreach ($grouplist as $key => $value) {

      $groupID = $value->id;
      $groupOwnerID = $value->groupowner_id;
      $memberCount = Groupmembers::where('group_id', $groupID)->count();
      $groupOwner = User::where('id', $groupOwnerID)->first();

      $groupfilesActivity = File::leftJoin('users', "users.id", "files.fileownerid")
        ->leftJoin('groupfiles', "groupfiles.file_id", "=", "files.id")
        ->where('groupfiles.group_id', "=", $groupID)
        ->orderBy('groupfiles.updated_at', "desc")
        ->first();

      $groupmsgActivity = Groupmessages::where('group_id', "=", $groupID)
        ->leftJoin('users', 'users.id', "=", 'groupmessages.user_id')
        ->orderBy('groupmessages.updated_at', "desc")
        ->first();

      $lastActivity = NULL;
      $lastActive = NULL;

      // No Entry in Db we use the Default gruop creation
      if ($groupfilesActivity == NULL && $groupmsgActivity == NULL) {
        $lastActivity = $value->created_at;
        $lastActive = $groupOwner->firstname;
      } else if ($groupfilesActivity != NULL && $groupmsgActivity == NULL) {
        $lastActivity = $groupfilesActivity['updated_at'];
        $lastActive = $groupfilesActivity['firstname'];
      } else if ($groupmsgActivity != NULL && $groupfilesActivity == NULL) {
        $lastActivity = $groupmsgActivity['updated_at'];
        $lastActive = $groupmsgActivity['firstname'];
      } else {
        $lastActivity = strcmp($groupfilesActivity['updated_at'], $groupmsgActivity['updated_at']) > 0 ? $groupfilesActivity['updated_at'] : $groupmsgActivity['updated_at'];
        $lastActive = strcmp($groupfilesActivity['updated_at'], $groupmsgActivity['updated_at']) > 0 ? $groupfilesActivity['firstname'] : $groupmsgActivity['firstname'];
      }

      $retJSON =
      [
        'title' => $value->groupname,
        'description' => $value->description,
        'lastActivity' => $lastActivity,
        'lastActive' => $lastActive,
        'memberCount' => $memberCount,
        'owner' => $groupOwner->firstname,
        'ownerid' => $groupOwner->id,
        'id' => $groupID
      ];

      array_push($retArray, $retJSON);

    }

    $groupCountJSON =
    [
      'groups' => $groupcount,
      'page' => $page,
      'size' => $size,
      'pages' => ceil($groupcount / $size)
    ];

    array_push($retArray, $groupCountJSON);

    //convert $retArray to a collection
    $collection = collect($retArray);
    //sort the collection descending by a specific value
    $sortedCollection = $collection->sortByDesc('lastActivity');
    //the $sortedCollection is passed to GroupResource where it will be converted to an Array and returned afterwards
    return GroupResource::collection($sortedCollection);

  }

  /**
   * Get a list of all public groups the user is NOT part of
   * @param  \Illuminate\Http\Request $request
   * @return App\Http\Resources\Group as GroupResource - a collection of groups
   */
  public function getGroupListNoMember(Request $request)
  {

    $userID = $request->input('userid');
    $size = $request->input('size');
    $page = $request->input('page');

    // get all groups where user is part of
    $userInGroups = Groupmembers::select('group_id')->where('user_id','=', $userID)->get();

    // get a collection of all public groups where user is not part of
    $groupmember = Group::whereNotIn('id', $userInGroups)->where('is_public', 1)->get();

    // count the groups
    $groupcount = count($groupmember);

    // get a paginated collection of all public groups where user is not part of
    $grouplist = Group::whereNotIn('id', $userInGroups)->where('is_public', 1)->paginate($size);

    $retArray = [];
    $grouptitleArray = [];
    $duplicate = false;

    foreach ($grouplist as $key => $value) {

      $groupID = $value->id;
      $groupOwnerID = $value->groupowner_id;
      $memberCount = Groupmembers::where('group_id', $groupID)->count();
      $groupOwner = User::where('id', $groupOwnerID)->first();

      $groupfilesActivity = File::leftJoin('users', "users.id", "files.fileownerid")
        ->leftJoin('groupfiles', "groupfiles.file_id", "=", "files.id")
        ->where('groupfiles.group_id', "=", $groupID)
        ->orderBy('groupfiles.updated_at', "desc")
        ->first();

      $groupmsgActivity = Groupmessages::where('group_id', "=", $groupID)
        ->leftJoin('users', 'users.id', "=", 'groupmessages.user_id')
        ->orderBy('groupmessages.updated_at', "desc")
        ->first();

      $lastActivity = NULL;
      $lastActive = NULL;

      // No Entry in Db we use the Default gruop creation
      if ($groupfilesActivity == NULL && $groupmsgActivity == NULL) {
        $lastActivity = $value->created_at;
        $lastActive = $groupOwner->firstname;
      } else if ($groupfilesActivity != NULL && $groupmsgActivity == NULL) {
        $lastActivity = $groupfilesActivity['updated_at'];
        $lastActive = $groupfilesActivity['firstname'];
      } else if ($groupmsgActivity != NULL && $groupfilesActivity == NULL) {
        $lastActivity = $groupmsgActivity['updated_at'];
        $lastActive = $groupmsgActivity['firstname'];
      } else {
        $lastActivity = strcmp($groupfilesActivity['updated_at'], $groupmsgActivity['updated_at']) > 0 ? $groupfilesActivity['updated_at'] : $groupmsgActivity['updated_at'];
        $lastActive = strcmp($groupfilesActivity['updated_at'], $groupmsgActivity['updated_at']) > 0 ? $groupfilesActivity['firstname'] : $groupmsgActivity['firstname'];
      }

      $retJSON =
      [
        'title' => $value->groupname,
        'description' => $value->description,
        'lastActivity' => $lastActivity,
        'lastActive' => $lastActive,
        'memberCount' => $memberCount,
        'owner' => $groupOwner->firstname,
        'ownerid' => $groupOwner->id,
        'id' => $groupID
      ];

        array_push($retArray, $retJSON);

    }

    $groupCountJSON =
    [
      'groups' => $groupcount,
      'page' => $page,
      'size' => $size,
      'pages' => ceil($groupcount / $size)
    ];

    array_push($retArray, $groupCountJSON);

    //convert $retArray to a collection
    $collection = collect($retArray);
    //sort the collection descending by a specific value
    $sortedCollection = $collection->sortByDesc('lastActivity');
    //the $sortedCollection is passed to GroupResource where it will be converted to an Array and returned afterwards
    return GroupResource::collection($sortedCollection);

  }

  /**
   * create a new group
   * stores a new Group resource
   * @param  \Illuminate\Http\Request $request
   */
  public function createGroup(Request $request)
  {

    $userID         = $request->input('userid');
    $groupName      = $request->input('groupname');
    $description    = $request->input('description');
    $fileLimit      = $request->input('filelimit');
    $fileSizeLimit  = $request->input('filesizelimit');
    $is_public  = $request->input('is_public');

    // Check if groupname is already taken
    $checkgroup = Group::where('groupname', $groupName)->first();

    if ($checkgroup) {
      return response()->json(['error' => "Groupname is already taken!"], 403);
    }

    // Create new group
    $newGroup = new Group();
    $newGroup->groupowner_id    = $userID;
    $newGroup->groupname        = $groupName;
    $newGroup->description      = $description;
    $newGroup->file_limit       = $fileLimit;
    $newGroup->file_size_limit  = $fileSizeLimit;
    $newGroup->is_public  = $is_public;
    $newGroup->save();

    $groupID = Group::where('groupname', $groupName)->first()->id;

    // Creating a new group membership
    $newMember = new Groupmembers();
    $newMember->group_id = $groupID;
    $newMember->user_id = $userID;
    $newMember->grouprole = 'owner';
    $newMember->is_active = 1;
    $newMember->save();

    return response()->json([
      'success' => 'Group was successfully created!',
      'groupid' => $groupID
    ], 200);
  }

  /**
   * delete an existing group
   * destroys all resource, notification, invite and groupmember resources
   * @param  \Illuminate\Http\Request $request
   */
  public function deleteGroup(Request $request)
  {

    $userID         = $request->input('userid');
    $groupID        = $request->input('groupid');

    // Check if group exists
    $group = Group::where('id', $groupID)->first();

    if (!$group) {
      return response()->json(['error' => "Group does not exist!"], 403);
    }

    // Check if user is the groupowner
    $groupOwnerID = $group->groupowner_id;
    if ($userID != $groupOwnerID) {
      return response()->json(['error' => "User is not the group owner!"], 403);
    }
    // Delete notifications
    $notifications = Notification::where('group_id', $groupID)->delete();

    // Delete invites
    $invites = Invite::where('invited_group_id', $groupID)->delete();

    // Delete groupmembers
    $members = Groupmembers::where('group_id', $groupID)->delete();

    // Delete group
    $deletedRows = $group->delete();

    return response()->json([
      'success' => 'Group was successfully deleted!'
    ], 200);
  }

  /**
   * sent an invitation to another user
   * creates an invite and notification resource
   * @param  \Illuminate\Http\Request $request
   */
  public function inviteGroup(Request $request)
  {
    $user_id = $request->input("userid");
    $group_id = $request->input("groupid");
    $receiver_id = $request->input("receiverid");

    if ($user_id == $receiver_id){
      return response()->json([
        'error' => 'You cannot send invites to yourself!'
      ], 403);
    }

    $checkIfAlreadyInvited = Invite::where('receiver_id', $receiver_id)->where('sender_id', $user_id)->where('invited_group_id',$group_id)->where('status','pending')->first();

    if ($checkIfAlreadyInvited) {
      if ($checkIfAlreadyInvited->status == 'pending'){
        return response()->json([
          'error' => 'You have already sent this user an invitation to join this group.'
        ], 403);
      }
    }


    $sender = User::where('id', $user_id)->first();
    $group = Group::where('id', $group_id)->first();
    $receiver_user = User::where('id', $receiver_id)->first();

    // Check if member is already a member
    $checkmember = Groupmembers::where('group_id', $group_id)->where('user_id', $receiver_id)->first();
    if ($checkmember) {
      return response()->json(['error' => "This User is already a member of this group!"], 403);
    }

    $sender_id = $user_id;

    //1 for group invite
    $notification_type = 1;

    if (!$receiver_user) {
      return response()->json([
        'error' => 'This user does not exist.'
      ], 403);
    } else if (!$group) {
      return response()->json([
        'error' => 'This group does not exist.'
      ], 403);
    }

    $notification_msg = $sender["firstname"] . ' ' . $sender["lastname"] . ' invited you to join Group ' . '\'' . $group["groupname"] . '\'';

    // Create new Notification
    $newNotification = new Notification();
    $newNotification->receiver_id = $receiver_id;
    $newNotification->sender_id = $sender_id;
    $newNotification->group_id = $group_id;
    $newNotification->notification_msg = $notification_msg;
    $newNotification->notification_type = $notification_type;
    $newNotification->save();

    // Create new Invitation
    $newInvite = new Invite();
    $newInvite->receiver_id = $receiver_id;
    $newInvite->sender_id = $sender_id;
    $newInvite->invited_group_id = $group_id;
    $newInvite->save();

    return response()->json([
      'success' => 'Group invite was succesfully send.'
    ], 200);
  }

  /**
   * Join a public or private group
   * creates a groupmember resource
   * @param  \Illuminate\Http\Request $request
   */
  public function joinGroup(Request $request)
  {
    $userID   = $request->input('userid');
    $groupID  = $request->input('groupid');

    $group = Group::where('id', $groupID)->first();

    // Check if an invite exists
    $checkinvite = Invite::where('invited_group_id', $groupID)->where('receiver_id', $userID)->where('status','pending')->first();

    // Check if user is already a member
    $checkmember = Groupmembers::where('group_id', $groupID)->where('user_id', $userID)->first();

    // Check if group exists
    if (!$group) {
      return response()->json([
        'error' => 'This group does not exist.'
      ], 403);
    }

    // Check if user is already a member of this group
    if ($checkmember) {
      return response()->json(['error' => "User is already a member!"], 403);
    }

    // Check if user is not already a part of the private group and has an invitation
    if ($group->is_public == 0 && !$checkinvite) {
      return response()->json([
        'error' => 'You need an invitation to join this group.'
      ], 403);
    }

    // Creating a new group membership
    $newMember = new Groupmembers();
    $newMember->group_id = $groupID;
    $newMember->user_id = $userID;
    $newMember->grouprole = 'member';
    $newMember->is_active = 1;
    $newMember->save();

    // Check if an invite exists
    if ($checkinvite) {
      // Update status to accepted in invites Table
      $checkinvite->status = "accepted";
      $checkinvite->save();

      // Update notification_read value to read (1)
      $notification = Notification::where('receiver_id', $userID)->where('group_id', $groupID)->first();
      $notification->notification_read = 1;
      $notification->save();
    }

    return response()->json([
      'success' => 'Group was successfully joined!'
    ], 200);
  }

  /**
   * leave a group
   * deletes groupmembers resource
   * @param  \Illuminate\Http\Request $request
   * @return App\Http\Resources\Group as GroupResource - a collection of groups
   */
  public function leaveGroup(Request $request)
  {
    $userID   = $request->input('userid');
    $groupID  = $request->input('groupid');

    // Check if user is a member
    $checkmember = Groupmembers::where('group_id', $groupID)->where('user_id', $userID)->first();
    if (!$checkmember) {
      return response()->json(['error' => "User is not amember of this group!"], 403);
    }

    // Delete membership
    $deletedRows = Groupmembers::where('group_id', $groupID)->where('user_id', $userID)->delete();

    return response()->json([
      'success' => 'Group was successfully left!'
    ], 200);
  }

   /**
    * Retrieves all Files from a group
    * @param  \Illuminate\Http\Request  $request
    * @return App\Http\Resources\File a collection of the groupfiles
    */
  public function getGroupFiles(Request $request) {

    $groupid = $request->input('groupid');
    $userid = $request->input('userid');

        // Check if user is already a member
        $checkmember = Groupmembers::where('group_id', $groupid)->where('user_id', $userid)->first();
        if ($checkmember) {

          $groupfilelist = File::leftJoin("groupfiles","groupfiles.file_id","=","files.id")->where("group_id","=",$groupid)->get();

          return response()->json($groupfilelist, 200);
        }
        return response()->json(['error' => "You are not a member of this group!"], 403);
  }


   /**
    * Download a groupfile with the given ID
    * @param  \Illuminate\Http\Request  $request
    * @return App\Http\Resources\File the downloadpath of the requested file
    */
  public function downloadGroupFiles(Request $request,$groupid,$fileid) {

    $userID = $request->input("userid");

    // Check if user is a member
    $checkmember = Groupmembers::where('group_id', $groupid)->where('user_id', $userID)->first();

    if (!$checkmember) {
      return response()->json(['error' => "User is not a member of this group!"], 403);
    }

    // Check for groupfile
    $groupfile = File::leftJoin('groupfiles', "groupfiles.file_id", "=", "files.id")
    ->where('groupfiles.group_id', "=", $groupid)
    ->where('groupfiles.file_id', "=", $fileid)
    ->first();

    if(!$groupfile) {
      return response()->json(['error' => "File does not exist!"], 403);
    }

    $downloadpath =  storage_path()."/app/".$groupfile->filepath;

    return response()->download($downloadpath);

}

   /**
    * Publish a file from the inventory to a group with the given ID
    * @param  \Illuminate\Http\Request $request
    */
  public function publishGroupFiles(Request $request) {

    $groupID = $request->input("groupid");
    $userID = $request->input("userid");
    $fileID = $request->input("fileid");

    // Check inventory for file
    $file = File::where("id",$fileID)->where('fileownerid',$userID)->first();
    if(!$file) {
      return response()->json(['error' => "File does not exist, or the User is not the owner!"], 403);
    }

    // Check if user is a member
    $checkmember = Groupmembers::where('group_id', $groupID)->where('user_id', $userID)->first();
    if (!$checkmember) {
      return response()->json(['error' => "User is not a member of this group!"], 403);
    }

    $checkFile = Groupfiles::where('group_id', $groupID)->where('file_id', $fileID)->first();

    if ($checkFile) {
      return response()->json(['error' => "You have already published this file to this group."], 403);
    }

    $groupFileLimit = Group::select('file_limit')->where('id', $groupID)->first();
    $groupFileLimit = $groupFileLimit->file_limit;

    $checkFileLimit = Groupfiles::where('group_id', $groupID)->get();
    $fileCount = $checkFileLimit->count();

    if ($fileCount >= $groupFileLimit) {
      return response()->json(['error' => "The limit of files in this group has been reached."], 403);
    }

    $groupFileSizeLimit = Group::select('file_size_limit')->where('id', $groupID)->first();
    $groupFileSizeLimit = $groupFileSizeLimit->file_size_limit;

    if ($this->formatSizeToMB($file->filesize) > $groupFileSizeLimit) {
      return response()->json(['error' => "You cannot publish this file. The file is larger than the allowed file size in the group. (" . $groupFileSizeLimit . " MB)"], 403);
    }

    // get all groupmembers of the requested group
    $groupmembers = Groupmembers::where('group_id', $groupID)->get();
    $group = Group::where('id', $groupID)->first();

    // create a update notification for every groupmember
      foreach ($groupmembers as $key => $value) {

        // Create new Notification resource
        $newNotification = new Notification();
        $newNotification->receiver_id = $value->user_id;
        $newNotification->sender_id = $userID;
        $newNotification->group_id = $groupID;
        if ($userID == $value->user_id) {
          $newNotification->notification_msg = 'You published a new file to group ' . '\'' . $group->groupname . '\'';
        } else {
          $newNotification->notification_msg = 'A new file was published to group ' . '\'' . $group->groupname . '\'';;
        }
        $newNotification->notification_type = 0;
        $newNotification->save();
      }

    // publish file to group
    $newGroupFile = new Groupfiles();
    $newGroupFile->group_id     = $groupID;
    $newGroupFile->file_id      = $fileID;
    $newGroupFile->save();

    return response()->json([
      'success' => 'File was successfully published!'
    ], 200);
}

/**
 * Helper function which formats bytes to MB
 * @param  $bytes
 * @return $bytes in MB
 */
function formatSizeToMB($bytes)
{
    $bytes = number_format($bytes / 1048576, 2);
    return $bytes;
}

/**
 * Search user by name
 * @param  \Illuminate\Http\Request $request
 * @return App\Http\Resources\User as UserResource - a collection of all found users
 */
public function searchUser(Request $request){

  $searched_user = $request->input('name');
  $searched_user_exploded = explode(" ", $searched_user);

  $size = $request->input('size');
  $page = $request->input('page');

  if (!empty($searched_user_exploded[1])) {
    //get all users with given firstname and lastname
    $userlist = User::where('firstname', 'like', $searched_user_exploded[0] . '%')->where('lastname', 'like', $searched_user_exploded[1] . '%')->orderBy('created_at', 'desc')->get();
    //count all users from userlist
    $usercount = count($userlist);
    //get all users with given firstname and lastname and paginate it
    $userlist = User::where('firstname', 'like', $searched_user_exploded[0] . '%')->where('lastname', 'like', $searched_user_exploded[1] . '%')->orderBy('created_at', 'desc')->paginate($size);
  } else {
    //get all users with given firstname OR lastname
    $userlist = User::where('firstname', 'like', $searched_user . '%')->orWhere('lastname', 'like', $searched_user . '%')->orderBy('created_at', 'desc')->get();
    //count all users from userlist
    $usercount = count($userlist);
    //paginate the userlist
    $userlist = User::where('firstname', 'like', $searched_user . '%')->orWhere('lastname','like', $searched_user . '%')->orderBy('created_at', 'desc')->paginate($size);
  }

  $retArray = [];

  foreach ($userlist as $key => $value) {
    $retJSON =
    [
      'id' => $value->id,
      'firstname' => $value->firstname,
      'lastname' => $value->lastname
    ];

    array_push($retArray, $retJSON);
  }

  $groupCountJSON =
  [
    'usercount' => $usercount,
    'page' => $page,
    'size' => $size,
    'pages' => ceil($usercount / $size)
  ];

  array_push($retArray, $groupCountJSON);

  //convert $retArray to a collection
  $collection = collect($retArray);

  //the $collection is passed to UserResource where it will be converted to an Array and returned afterwards
  return UserResource::collection($collection);
}

/**
 * Get all Group details - like name, lastActive, created_at, ...
 * @param  \Illuminate\Http\Request  $request
 */
public function getGroupDetails(Request $request) {

  $groupID = $request->input("groupid");

  $group = Group::where('id', $groupID)->first();

  if (!$group){
    return response()->json([
      'error' => 'This group does not exist.',
    ], 403);
  }

  $groupOwner = User::where('id', $group->groupowner_id)->first();
  $groupmembers = Groupmembers::join('users', 'users.id', '=' , 'groupmembers.user_id')->where('group_id', $groupID)->get();

  $groupfilesActivity = File::leftJoin('users', "users.id", "files.fileownerid")
    ->leftJoin('groupfiles', "groupfiles.file_id", "=", "files.id")
    ->where('groupfiles.group_id', "=", $groupID)
    ->orderBy('groupfiles.updated_at', "desc")
    ->first();

  $groupmsgActivity = Groupmessages::where('group_id', "=", $groupID)
    ->leftJoin('users', 'users.id', "=", 'groupmessages.user_id')
    ->orderBy('groupmessages.updated_at', "desc")
    ->first();

  $lastActivity = NULL;
  $lastActive = NULL;

  // No Entry in DB we use the default gruop creation
  if ($groupfilesActivity == NULL && $groupmsgActivity == NULL) {
    $lastActivity = $group->created_at;
    $lastActive = $groupOwner->firstname;
  } else if ($groupfilesActivity != NULL && $groupmsgActivity == NULL) {
    $lastActivity = $groupfilesActivity['updated_at'];
    $lastActive = $groupfilesActivity['firstname'];
  } else if ($groupmsgActivity != NULL && $groupfilesActivity == NULL) {
    $lastActivity = $groupmsgActivity['updated_at'];
    $lastActive = $groupmsgActivity['firstname'];
  } else {
    $lastActivity = strcmp($groupfilesActivity['updated_at'], $groupmsgActivity['updated_at']) > 0 ? $groupfilesActivity['updated_at'] : $groupmsgActivity['updated_at'];
    $lastActive = strcmp($groupfilesActivity['updated_at'], $groupmsgActivity['updated_at']) > 0 ? $groupfilesActivity['firstname'] : $groupmsgActivity['firstname'];
  }

  $collection = collect($groupmembers);
  //sort the collection descending by a specific value
  $sortedCollection = $collection->sortByDesc('lastActivity');
  //the $sortedCollection is passed to GroupmemberResource where it will be converted to an Array and returned afterwards
  $sortedGroupmembers = GroupmemberResource::collection($sortedCollection);

  return response()->json([
    'groupid' => $groupID,
    'title' => $group->groupname,
    'description' => $group->description,
    'createdAt' => $group->created_at,
    'lastActivity' => $lastActivity,
    'lastActive' => $lastActive,
    'members' => $sortedGroupmembers
  ], 200);

}

/**
 * decline an invitation
 * updates an invitation and notification resource
 * @param  \Illuminate\Http\Request $request
 */
function declineInvite(Request $request){

  $userID = $request->input('userid');
  $groupID = $request->input('groupid');

  $pendingInvite = Invite::where('receiver_id', $userID)->where('invited_group_id', $groupID)->where('status','pending')->first();

  if ($pendingInvite) {
    $pendingInvite->status = 'declined';
    $pendingInvite->save();

    $notification = Notification::where('receiver_id', $userID)->where('group_id', $groupID)->first();
    $notification->notification_read = 1;
    $notification->save();

    return response()->json([
      'success' => 'Group invite was declined.'
    ], 200);
  } else {
    return response()->json([
      'error' => 'This invite does not exist.'
    ], 403);
  }

}

/**
 * Delete a published file from a group
 * destroys a groupfile resource
 * @param  \Illuminate\Http\Request $request
 */
public function deleteFile(Request $request) {

    //Checking if User ID has File ID
    $userID = $request->input('userid');
    $fileID = $request->input('fileid');
    $groupID = $request->input('groupid');

    $deletefile = Groupfiles::where('group_id', $groupID)->where('file_id', $fileID)->first();

    if ($deletefile) {

        $deleted_fileid = $deletefile->id;

        //Delete DB Entry
        $deletefile->delete();

        return response()->json([
                    'message' => "The file with the fileid ".$fileID. " was successfully removed from this group!"
                        ], 200);
    }
}

}
