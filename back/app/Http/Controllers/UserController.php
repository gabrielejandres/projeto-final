<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
  //chama a funcao para criar um Usuario
  public function createUser(Request $request){
    $user= new User;
    $user->createUser($request);
    return response()->json([$user]);
  }

  //chama a funcao para atualizar um Usuario
  public function updateUser(Request $request, $id){
    $user = User::find($id);
    if ($user){
      $user->updateUser($request);
      $user->save();
      return response()->json([$user]);
    }
    else{
      return response()->json(['Usuario nao encontrado']);
    }
  }

  public function listUser($id){
    $user = User::findOrFail($id);
    return response()->json(['user' => $user, 'status' => 200]);  
  }

  //Retorna um usuário que esteja relacionado com uma república
  public function listUserByIdRepublic($republic_id){
    $user = User::where('republic_id', $republic_id)->get();
    return response()->json(['user' => $user, 'status' => 200]);
  }

    //deleta um Usuario
  public function deleteUser($id){
    User::destroy($id);
    return response()->json(['Usuario deletado']);
  }

  //estabelece uma relação entre Usuario e Republica
  public function addRepublicintoUser(UserRequest $request, $id){
    $user = User::find($id);
    if($request->republic_id){
      $user->republic_id = $request->republic_id;
    }
    $user->save();
    return response()->json(['Efetuado com sucesso!']);
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
