<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Resources\Notification as NotificationResource;
use App\Models\User;
use App\Models\Group;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get a list of all Notifications a user received
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Notification as NotificationResource - a collection of all notifications
     */
    public function getAllNotifications(Request $request)
    {
      $userID = $request->input('userid');

      //get all notification from specific user where notification has not been read
      $notifications = Notification::where('receiver_id', $userID)->where('notification_read', 0)->get();

      $resultArray = [];

      foreach($notifications as $key => $value){
        $sender_name = Notification::join('users', 'users.id', '=', 'notifications.sender_id')
        ->select('users.firstname','users.lastname')
        ->where('users.id', '=' , $value['sender_id'])
        ->first();

        $resultJSON =
        [
          'notification_id' => $value["id"],
          'sender_firstname' => $sender_name["firstname"],
          'sender_lastname' => $sender_name["lastname"],
          'notification_type' => $value["notification_type"],
          'notification_msg' => $value['notification_msg'],
          'invited_group_id' => $value['group_id'],
          'created_at' => $value['created_at']
        ];

          array_push($resultArray, $resultJSON);

      }

      //convert $notifications to a collection
      $collection = collect($resultArray);
      //sort the collection descending by a specific value
      $sortedCollection = $collection->sortByDesc('created_at');
      //the $sortedCollection is passed to NotificationResource where it will be converted to an Array and returned afterwards
      return NotificationResource::collection($sortedCollection);
    }

    /**
     * Display a specific notification.
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Notification as NotificationResource - a collection of one specific notification
     */
    public function getSpecificNotification(Request $request)
    {
      $userID = $request->input('userid');
      $notificationID = $request->input('notificationid');

      if($notificationID > 0) {
        //get specific notification from specific user
        $notifications = Notification::where('receiver_id', $userID)->get();

        //get specific notification
        $notifications = $notifications->slice($notificationID-1, 1);

        //convert $notifications to a collection
        $collection = collect($notifications);
        $count = count($collection);

        if ($count == 0){
          return response()->json([
            'error' => 'This Notification does not exist.'
          ], 403);
        } else {
          //the $collection is passed to NotificationResource where it will be converted to an Array and returned afterwards
          return NotificationResource::collection($collection);
        }
      } else {
        return response()->json([
          'error' => 'This Notification does not exist.'
        ], 403);
      }
    }

    /**
     * Update the specified notification in database.
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function updateNotification(Request $request) {

      $userID = $request->input('userid');
      $notificationID = $request->input('notificationid');

          if ($userID == 0 || $notificationID == 0) {
              return response()->json(['error' => "insert valid userID and notificationID"], 403);
          } else {
            //get notification collection for specific user
            $notifications = Notification::where('receiver_id', $userID)->where('id',$notificationID)->first();

            if (!empty($notifications)) {
            $notifications->notification_read = 1;

            // Update the notification
            $notifications->save();

            return response()->json([
              'success' => 'Notification was successfully updated!'
            ], 200);

            } else {
              return response()->json(['error' => "Notification does not exist!"], 403);
            }
          }
    }


    /**
     * Remove the specified notification from database.
     *
     * @param  \Illuminate\Http\Request $request
     */
    public function deleteNotification(Request $request)
    {

      $userID = $request->input('userid');
      $notificationID = $request->input('notificationid');

      if ($userID == 0 || $notificationID == 0) {
        return response()->json(['error' => "insert valid userID and notificationID"], 403);
      } else {
        //get notification collection for specific user
        $notifications = Notification::where('receiver_id', $userID)->get();

        //slice for specific notification
        $specificNotification = $notifications->slice($notificationID-1, 1);

        //convert collection to eloquent object for delete
        $specificNotification = $specificNotification->first();

        if (!empty($specificNotification)) {
        // Delete the notification
        $deletedNotification = $specificNotification->delete();

        return response()->json([
          'success' => 'Notification was successfully deleted!'
        ], 200);

        } else {
          return response()->json(['error' => "Notification does not exist!"], 403);
        }
      }
    }
}
