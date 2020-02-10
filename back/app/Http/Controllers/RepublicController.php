<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Republic;
use App\User;

class RepublicController extends Controller
{
  //chama a funcao para criar uma nova republica
  public function createRepublic(Request $request){
    $republic = new Republic();
    $republic->createRepublic($request);
    return response()->json([$republic]);
  }

  //chama a funcao para Atualizar uma republica
  public function updateRepublic(Request $request, $id){
    $republic = Republic::find($id);
    if ($republic){
      $republic->updateRepublic($request);
      return response()->json([$republic]);
    }
    else{
      return response()->json(['Esta Republica não existe']);
    }
  }

  //Método que retorna lista com todos os comentarios
  public function listRepublic(){
    $user = User::all();
    return response()->json($user);
  }

  public function searchRepublic(Request $request){

  }

  //estabelece relação entre Republica e locatario
  public function addUser(Request $request, $id){
    $user = User::find($id);
    if($request->republic_id){
      $user->republic_id = $request->republic_id;
    }
    $user->save();
    return response()->json(['Efetuado com sucesso!']);
  }

  //remove relação entre Locatario e republica
  public function removeUser(Request $request, $id){
    $user = User::find($id);

    if($request->republic_id){
      $user->republic_id = null;
    }
    $user->save();
    return response()->json(['Efetuado com sucesso!']);
  }

}
