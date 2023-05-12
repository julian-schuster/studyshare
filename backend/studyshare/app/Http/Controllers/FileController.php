<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Groupfiles;
use App\Http\Resources\File as FileResource;
use App\Models\Groupmembers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

//Constants of File Types
define("FILES_ROOT", "files");
define("FILES_VIDEO", "videos");
define("FILES_AUDIO", "audios");
define("FILES_IMAGE", "images");
define("FILES_DOCUMENTS", "documents");

class FileController extends Controller {

    /**
     * Retrieve all Files for a specific user
     * @return \Illuminate\Http\Response
     */
    public function getFileList(Request $request) {

        $userID = $request->input('userid');
        $size = $request->input('size');
        $page = $request->input('page');
        $resultArray = [];

        // Return all entries from specific user
        $filelist = File::where('fileownerid', "=", $userID)->orderBy('created_at', 'desc')->get();
        // count of all groups from specfic user
        $filecount = count($filelist);
        //paginate the collection
        $filelist = File::where('fileownerid', "=", $userID)->orderBy('created_at', 'desc')->paginate($size);

        foreach ($filelist as $key => $value) {

          $fileownername = File::join('users', 'users.id', '=', 'files.fileownerid')
          ->select('users.firstname','users.lastname')
          ->where('users.id', '=' , $value['fileownerid'])
          ->first();

          $filesize = $this->formatSizeUnits($value->filesize);

        $resultJSON =
        [
          'filename' => $value->filename,
          'owner' => $fileownername['firstname'],
          'filepath' => $value->filepath,
          'created_at' => $value->created_at,
          'filesize' => $filesize,
          'fileid' => $value->id
        ];

        array_push($resultArray, $resultJSON);

        }

        $fileCountJSON =
        [
          'files' => $filecount,
          'page' => $page,
          'size' => $size,
          'pages' => ceil($filecount / $size)
        ];

        array_push($resultArray, $fileCountJSON);

        //convert $retArray to a collection
        $collection = collect($resultArray);
        //sort the collection descending by a specific value
        $sortedCollection = $collection->sortByDesc('created_at');
        //the $sortedCollection is passed to GroupResource where it will be converted to an Array and returned afterwards
        return FileResource::collection($sortedCollection);

    }


    /**
     * helper function to convert bytes into fitting sizes
     * @param $bytes - the file size in bytes
     * @return $bytes - the converted bytes
     */
    function formatSizeUnits($bytes)
    {
        if ($bytes >= 1073741824)
        {
                $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        }
        elseif ($bytes >= 1048576)
        {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }
        elseif ($bytes >= 1024)
        {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }
        elseif ($bytes > 1)
        {
            $bytes = $bytes . ' bytes';
        }
        elseif ($bytes == 1)
        {
            $bytes = $bytes . ' byte';
        }
        else
        {
            $bytes = '0 bytes';
        }

        return $bytes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $uploadedFile = $request->file('file');
        $userID = $request->input('userid');
        $groupID = $request->input('groupid');

        //Validating Inputs
        $uploadrules = [
            'file' => ['required', "max:20000"],
        ];
        //Custom Validation Error-Messages
        $uploadrules_error_msg = [
            'file.required' => 'Please add a file to upload',
        ];

        $validator = Validator::make($request->all(), $uploadrules, $uploadrules_error_msg);

        if ($validator->fails()) {

            return response()->json($validator->messages(), 403);
        }

        $FilePath = $this->getFileType($uploadedFile->getClientMimeType());

        if ($FilePath != -1) {

            $filename = hash("sha256",time() . $uploadedFile->getClientOriginalName()).".".$uploadedFile->getClientOriginalExtension();

            $isStored = Storage::disk('local')->putFileAs(
                    'files/' . $FilePath . "/", $uploadedFile, $filename
            );

            //Create DB Entry
            $file = new File();
            $file->fileownerid = $userID;
            $file->filename = $uploadedFile->getClientOriginalName();
            $file->filepath = FILES_ROOT . '/' . $FilePath . "/" . $filename;
            $file->filetype = $uploadedFile->getClientOriginalExtension();
            $file->filesize = $uploadedFile->getSize();
            $file->save();

            // Create DB Entry for Groupfiles if ID exists
            if ($groupID) {
                $groupfile = new Groupfiles();
                $groupfile->group_id = $userID;
                $groupfile->file_id = $file->id;
                $groupfile->save();
            }

            return response()->json([
                        'success' => $uploadedFile->getClientOriginalName() . ' has been successfully added to your inventory.',
                        'fileid' => $file->id,
                        'filename' => $filename,
                            ], 200);
        }



        return response()->json([
                    'error' => "File could not be stored in Database!"
                  ], 403);
    }

    /**
     * Delete / Destroy a File from the storage
     * @param Request $request
     */
    public function destroy(Request $request) {

        //Checking if User ID has File ID
        $userID = $request->input('userid');
        $deletefile = File::where('id', $request->input('fileid'))->where('fileownerid', $userID)->first();

        if ($deletefile) {

            //Delete File in Storage
            Storage::disk('local')->delete($deletefile->filepath);

            $deleted_fileid = $deletefile->id;

            //Delete DB Entry
            $deletefile->delete();

            return response()->json([
                        'message' => "The file with the fileid ".$deleted_fileid. " was successfully removed from your Inventory!"
                            ], 200);
        }
    }

    /**
     * Helper function for mimetypes
     * @param type $mimetype
     */
    private function getFileType($mimetype) {

        $audio_types = ["audio/aac", "audio/opus", "audio/ogg", "audio/mpeg", "audio/wav", "audio/webm"];

        $video_types = ["video/mpeg", "video/mp4", "video/ogg", "video/webm"];

        $image_types = ["image/png", "image/jpeg", "image/gif", "image/bmp", "image/svg+xml"];

        $document_types = ["text/comma-separated-values", "text/css", "text/html", "text/javascript", "text/plain", "text/richtext", "text/xml","application/pdf","application/zip","application/mspowerpoint","application/msword","application/msexcel"];


        switch ($mimetype) {
            case in_array($mimetype, $audio_types) : return FILES_AUDIO;
            case in_array($mimetype, $video_types) : return FILES_VIDEO;
            case in_array($mimetype, $image_types) : return FILES_IMAGE;
            case in_array($mimetype, $document_types) : return FILES_DOCUMENTS;
            default : return -1;
        }
    }

     /**
      * Download a File with the given ID
      * @param Request $request
      * @return $downloadpath of the requested file
      */
    public function downloadFile(Request $request) {
      $userid = $request->input("userid");
              $fileid = $request->input("fileid");

              $file = File::where("id","=",$fileid)->where("fileownerid","=",$userid)->first();

              if($file == null) {

                  return response()->json([
                      'error' => "you cant download this file"
                          ], 403);
              }

             $downloadpath =  storage_path()."/app/".$file->filepath;

             return response()->download($downloadpath);
    }

}
