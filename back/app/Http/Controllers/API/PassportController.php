<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Republic;
use Auth;
use DB;

class PassportController extends Controller
{
      public $successStatus = 200;

      public function registerUser(Request $request){
      $validator=Validator::make($request->all(),[
          'name' => 'required',
          'email' => 'required|email|unique:Users,email',
          'password' => 'required',
          'telephone' => 'required'|'string',
        ]);
      if ($validator ->fails()){
        return  response()->json(['erro'=>$validator->errors()], 401);
      }
      $newuser=new User;
      $newuser->createUser($request);
      $newuser->save();
      $success['token']=$newuser->createToken('MyApp')->accessToken;
      $success['name']=$newuser->name;
      return response()->json(['success'=>$success], $this->successStatus);

      }

      public function registerRepublic(Request $request){
        $validator=Validator::make($request->all(),[
          'name' => 'required|string',
          'evaluation' => 'required|integer',
          'single_rooms' => 'required|integer',
          'evaluation' => 'required|string',
          'single_rooms' => 'required|integer',
          'double_rooms' => 'required|integer',
          'triple_rooms' => 'required|integer',
          'single_price' => 'required|string',
          'double_price' => 'required|string',
          'triple_price' => 'required|string',
          'info'=>'required|string',
          'street' => 'required|string',
          'number' => 'required|integer',
          'neighborhood' => 'required|alpha',
          'complement' => 'required|alpha',
          //  'photo'=>'required|file|image|mimes:jpeg,png,gif,webp|max:2048'
        ]);
          if ($validator ->fails()){
            return  response()->json(['erro'=>$validator->errors()], 401);
          }
          $newrepublic=new Republic;
          $newrepublic->createRepublic($request);
          $newrepublic->save();
          return response()->json(['success'=>$newrepublic]);
      }

      public function login(){
        if (Auth::attempt(['email'=>request('email'), 'password'=>request('password')])){
          $user=Auth::user();
          $success['token']=$user->createToken('MyApp')->accessToken;
          return response()->json(['success'=>$success], $this->successStatus);
        }
        else{
          return response()->json(['error'=>'Unauthorized'], 401);
        }
      }

      public function getDetails(){
        $user=Auth::user();
        return response()->json(['success'=>$user], $this->successStatus);
      }

      public function Logout(){
        $accessToken=Auth::user()->token();
        DB::table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->update(['revoked'=>true]);
        $accessToken->revoke();
        return response()->json(null, 204);
      }

}
