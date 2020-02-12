<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Republic;
use App\User;
use App\Comment;

class RepublicController extends Controller
{
  //chama a funcao para criar uma nova republica
  public function createRepublic(Request $request){
    $republic = new Republic;
    $republic->createRepublic($request);
    return response()->json([$republic]);
  }

  //chama a funcao para Atualizar uma republica
  public function updateRepublic(Request $request, $id){
    $republic = Republic::find($id);
    if ($republic){
      $republic->updateRepublic($request);
      return response()->json(['status' => 200, 'republic' => $republic]);
    }
    else{
      return response()->json(['status' => 401, 'error' => 'Esta Republica não existe']);
    }
  }

  //Retorna uma lista com todas as Republicas
  public function listallRepublic(){
    $republic = Republic::all();
    return response()->json($republic);
  }
  
  //Retorna uma Republica
  public function listRepublic($id){
    $republic = Republic::findOrFail($id);
    return response()->json([$republic]);
  }

  //Busca por bairros
  public function searchNeighborhood(Request $request){
    $response = Republic::where('neighborhood','LIKE','%'.$request->neighborhood.'%')->get();
    return response()->json(['republics' => $response, 'status' => 200]);
  }

  //Busca por menores preços
  public function searchPrice(){
    return Republic::orderBy('triple_price','asc')->take(12)->get();

  }

   // //Busca por mais comentadas
  // public function searchComments(){
  //   Comment::all();
  //   $comment= Comment::('content', $request)->count();


}