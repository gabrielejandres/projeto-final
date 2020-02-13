<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\confirmacaoCadastroRepublica;
use App\Republic;
use App\User;
use App\Comment;

class RepublicController extends Controller
{

  public function construct(){
    $this->middleware('ROLES');
  }

  //chama a funcao para criar uma nova republica
  public function createRepublic(Request $request){
    $republic = new Republic;
    $republic->createRepublic($request);
    $republic->notify(new confirmacaoCadastroRepublica($republic));
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

  public function deleteRepublic($id){
    Republic::destroy($id);
    return response()->json(['Republica deletada']);
  }

  public function createFavorite($idR, $id){
    $user=User::findOrFail($id);
    $republic=Republic::findOrFail($idR);
    $user->Favorites()->attach($republic);
    $user->save();
    return response()->json([$user]);
  //  $user->Favorites()->attach($request->republic_id);
  }

  // remove Favorites
  // $user->roles()->detach($roleId)

  // public function listFavorite($id){
  //   $staff = Staff::find(1);
  //
  //   foreach ($staff->photos as $photo)
  //
  //   $user = User::findOrFail($id);
  //   $republic = Republic::where('user_id', $id)->get();
  //   return response()->json(['user' => $republic, 'status' => 200]);
  //   // $user = User::findOrFail($id);
  //   // $republic->Favorites()->where('user_id', $id)->get();
  // }

  public function showAllAuthors ($id) {
    //Nessa linha a gente fala pro Laravel quando pegar todos os livros já pegar também
    // todos os dados de seus respectivos autores
    $books = Book::with('author')->get();
    $authors = []
    foreach ($books as $book) {
      array_push($authors,$book->author->name);
    }
    $authors = collect($authors);
    return response()->success($authors);
  }

  $user = User::where('user_id', $this->id)->get();


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
    return Republic::orderBy('evaluation','asc')->take(12)->get();
  }


}
