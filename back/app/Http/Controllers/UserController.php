<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\confirmacaoCadastro;
use Illuminate\Notifications\Notifiable;
use App\Republic;
use App\User;

class UserController extends Controller
{
  //chama a funcao para criar um Usuario
  // public function createUser(Request $request){
  //   $user= new User;
  //   $user->createUser($request);
  //   $user->notify(new confirmacaoCadastro($user));
  //   return response()->json([$user]);
  // }

  //chama a funcao para atualizar um Usuario
  public function updateUser(Request $request, $id){
    $user = User::find($id);
    if ($user){
      $user->updateUser($request);
      $user->save();
      return response()->json(['user'=>$user, 'status' => 200]);
    }
    else{
      return response()->json(['message'=>'Usuario nao encontrado', 'status'=>401]);
    }
  }

  //Retorna um usuário que esteja relacionado com uma república
  public function listUserByIdRepublic($republic_id){
    $user = User::where('republic_id', $republic_id)->where('is_locator', 1)->get();
    return response()->json(['user' => $user, 'status' => 200]);
  }

  public function ListRepublicFavorite($id){
        $republic = User::find($id)->Favorites;
        return response()->json($republic);
  }

  public function listUser($id){
    $user = User::findOrFail($id);
    return response()->json([$user]);
  }

    //deleta um Usuario
  public function deleteUser($id){
    User::destroy($id);
    return response()->json(['Usuario deletado']);
  }



  //estabelece uma relação entre Usuario e Republica
  public function addRepublicintoUser(Request $request, $id){
    $user = User::find($id);
    if($request->republic_id){
      $user->republic_id = $request->republic_id;
      $user->save();
      return response()->json(['Efetuado com sucesso!']);
    }
  }

  //remove uma relação entre Usuario e republica
  public function removeRepublicfromUser(Request $request, $id){
    $user = User::find($id);
    if($request->republic_id){
      $user->republic_id = null;
    }
    $user->save();
    return response()->json(['Efetuado com sucesso!']);
  }
}
