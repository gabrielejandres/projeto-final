<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Comment;
use Illuminate\Support\Facades\Storage;

class Republic extends Model
{
    //cria uma nova republica
  public function createRepublic($request){
    $this->name = $request->name;
    $this->info = $request->info;
    $this->evaluation = $request->evaluation;
    $this->single_rooms = $request->single_rooms;
    $this->double_rooms = $request->double_rooms;
    $this->triple_rooms = $request->triple_rooms;
    $this->single_price = $request->single_price;
    $this->double_price = $request->double_price;
    $this->triple_price = $request->triple_price;
    $this->street = $request->street;
    $this->number = $request->number;
    $this->neighborhood = $request->neighborhood;
    $this->complement = $request->complement;
    $this->save();
    // If (!Storage::exists('localPhotos/'))
  	// 	Storage::makeDirectory('localPhotos/',0775,true);

    //     $file=$request->file('photo');
    //     $filename=$this->id.'.'.$file->getClientOriginalExtension();
    //     $path=$file->storeAs('localPhotos',$filename);
    //     $this->photo=$path;
    // $this->save();
  }

  //Atualiza uma republica
  public function updateRepublic($request){
      if($request->name && $request->name!=NULL){
        $this->name = $request->name;
      }
      if($request->info){
        $this->info = $request->info;
      }
      if($request->single_rooms){
          $this->single_rooms = $request->single_rooms;
      }
      if($request->double_rooms){
          $this->double_rooms = $request->double_rooms;
      }
      if($request->triple_rooms){
          $this->triple_rooms = $request->triple_rooms;
      }
      if($request->single_price){
          $this->single_price= $request->single_price;
      }
      if($request->double_price){
          $this->double_price = $request->double_price;
      }
      if($request->triple_price){
          $this->triple_price = $request->triple_price;
      }
      if($request->street){
          $this->street = $request->street;
      }
      if($request->number){
          $this->number = $request->number;
      }
      if($request->neighborhood){
          $this->neighborhood = $request->neighborhood;
      }
      if($request->complement){
          $this->complement = $request->complement;
      }
      if($request->photo){
          $this->photo = $request->photo;
      }
      $this->save();
  }


  //Relationships
  public function Comment(){
  $this->hasMany('App\Comment');
  }

  public function User(){
    $this->hasMany('App\User');
  }
}
