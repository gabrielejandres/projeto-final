<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Republic;
use App\User;

class Comment extends Model
{
  //cria um novo comentario
  public function createComment($request){
    $this->content = $request->content;
    $this->evaluation = $request->evaluation;
    $this->save();
  }


  //Relationships
  public function republic(){
  return $this->belongsTo('App\Republic');
  }

  public function user(){
     return $this->belongsTo('App\User');
   }
}
