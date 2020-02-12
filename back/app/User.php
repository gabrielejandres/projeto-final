<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Http\Request;
use App\Republic;
use App\Comment;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //cria um novo usuario
  public function createUser($request){
    $this->name = $request->name;
    $this->email = $request->email;
    $this->password =bcrypt( $request->password);
    $this->is_locator=$request->is_locator;
    if($request->is_locator==1)
      $this->telephone = $request->telephone;
    $this->save();
  }

    //Atualiza um usuario
    public function updateUser(Request $request){
        if($request->name){
          $this->name = $request->name;
        }
        if($request->email){
          $this->email = $request->email;
        }
        if($request->password){
            $this->password = $request->password;
        }
        if($request->telephone){
            $this->telephone = $request->telephone;
        }
        $this->save();
    }

    //Relationships
    public function Comment(){
      return $this->hasMany('App\Comment');
    }

    public function Republic(){
      return $this->belongsTo('App\Republic');
    }

    public function Favorites(){
      return $this->belongsToMany('App\Republic');
    }

}
