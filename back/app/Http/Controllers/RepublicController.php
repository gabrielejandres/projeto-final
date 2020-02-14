<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Republic;
use App\User;
use App\Comment;

class RepublicController extends Controller
{

  public function construct(){
    $this->middleware('ROLES');
  }

  //chama a funcao para criar uma nova republica
  // public function createRepublic(Request $request){
  //   $republic = new Republic;
  //   $republic->createRepublic($request);
  //   return response()->json([$republic]);
  // }

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

  public function deleteRepublic($id){
    Republic::destroy($id);
    return response()->json(['Republica deletada']);
  }

  //Cria favorito
  public function createFavorite($idR, $id){
    $user=User::findOrFail($id);
    $republic=Republic::findOrFail($idR);
    $user->Favorites()->attach($republic);
    return response()->json([$user]);
  }

  public function deleteFavorite($id, $idR){
      $user = User::findOrFail($id);
      $republic=Republic::findOrFail($idR);
      $user->Favorites()->detach($republic);
      return response()->json([$user]);
  }

  //Retorna uma lista com todas as Republicas
  public function listallRepublic(){
    $republic = Republic::all();
    return response()->json(['republics'=> $republic, 'status' => 200]);
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

  //Busca por menores preços de quartos triplos
  public function searchPriceTriple(){
    return Republic::orderBy('triple_price','asc')->take(12)->get();
  }

  //Busca por menores preços de quartos duplos
  public function searchPriceDouble(){
    return Republic::orderBy('double_price','asc')->take(12)->get();
  }

  //Busca por menores preços de quartos individuais
  public function searchPriceSingle(){
    return Republic::orderBy('single_price','asc')->take(12)->get();
  }

  //Busca por melhores avaliações
  public function searchBestEvaluation(){
    return Republic::orderBy('evaluation','desc')->take(12)->get();
  }


}
