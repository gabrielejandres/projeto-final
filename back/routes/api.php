<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Rotas para usuario
Route::post('criarUsuario', 'UserController@createUser');
// Route::put('atualizarUsuario/{id}', 'UserController@updateUser');
Route::delete('deletarUsuario/{id}', 'UserController@deleteUser');
Route::get('listUser', 'UserController@listUser');

//Rotas para comentario
Route::post('criarComentario', 'CommentController@createComment');


//Rotas para republica
Route::post('criarRepublica', 'RepublicController@createRepublic');
Route::put('atualizarRepublica/{id}','RepublicController@updateRepublic');

//Rotas para Passport
Route::post('registerUser', 'API\PassportController@registerUser');
Route::post('registerRepublica', 'API\PassportController@registerRepublic');
// Route::put('updateUsuario', 'API\PassportController@updateUser');
Route::post('loginUser', 'API\PassportController@login');
Route::group(['middleware'=>'auth:api'], function(){
  Route::post('logout', 'API\PassportController@logout');
  Route::post('getDetails', 'API\PassportController@getDetails');
Route::post('deleteRepulic/{id}', 'API\PassportController@deleteRepublic')->middleware('perguntar');
  });
