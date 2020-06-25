<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Notifications\confirmacaoCadastro;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
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
          'password' => 'required'
        ]);
      if ($validator ->fails()){
        return  response()->json(['error' => $validator->errors(), 'status' => 401]);
      }
      $newuser=new User;
      $newuser->createUser($request);
      $newuser->notify(new confirmacaoCadastro($newuser));

        //return response()->json([$newuser]);
        $success['token']=$newuser->createToken('MyApp')->accessToken;
        //$success['name']=$newuser->name;
        return response()->json(['success'=>$success, 'status' => 200, 'user'=>$newuser]);

      }

      public function registerRepublic(Request $request){
        $validator=Validator::make($request->all(),[
          'name' => 'required|string',
          'evaluation' => 'integer',
          'single_rooms' => 'integer',
          'evaluation' => 'string',
          'single_rooms' => 'integer',
          'double_rooms' => 'integer',
          'triple_rooms' => 'integer',
          'single_price' => 'string',
          'double_price' => 'string',
          'triple_price' => 'string'
          // 'photo'=>'file|image|mimes:jpeg,png,gif,webp|max:2048'
        ]);
          if ($validator ->fails()){
            return  response()->json(['error' => $validator->errors(), 'status' => 401]);
          }
          $newrepublic=new Republic;
          $newrepublic->createRepublic($request);
          // $newrepublic->save();
          return response()->json(['success'=>$newrepublic, 'status' => 200, 'republic'=>$newrepublic]);
      }

      public function login(){
        if (Auth::attempt(['email'=>request('email'), 'password'=>request('password')])){
          $user=Auth::user();
          $success['token']=$user->createToken('MyApp')->accessToken;
          return response()->json(['success'=>$success, 'status' => 200, 'user'=>$user]);
        }
        else{
          return response()->json(['error'=>'Unauthorized', 'status' => 401]);
        }
      }

      public function getDetails(){
        $user=Auth::user();
        return response()->json(['success'=>$user], $this->successStatus);
      }

      public function logout(){
        $accessToken=Auth::user()->token();
        DB::table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->update(['revoked'=>true]);
        $accessToken->revoke();
        return response()->json(null, 204);
      }

}
