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
Route::post('createUser', 'UserController@createUser');
Route::put('updateUser/{id}', 'UserController@updateUser');
Route::delete('deleteUser/{id}', 'UserController@deleteUser');
Route::get('listUser/{id}' , 'UserController@listUser');

//Rotas para comentario
Route::post('createComment', 'CommentController@createComment');


//Rotas para republica
Route::post('createRepublic', 'RepublicController@createRepublic');
Route::put('updateRepublic/{id}','RepublicController@updateRepublic');
Route::get('listRepublic/{id}' , 'RepublicController@listRepublic');
Route::get('listallRepublic' , 'RepublicController@listallRepublic');
Route::get('searchNeighborhood/{neighborhood}', 'RepublicController@searchNeighborhood');
Route::get('searchPrice', 'RepublicController@searchPrice');
Route::get('searchComment', 'RepublicController@searchComment');

//Rotas para inserir relaçõels
Route::put('addRepublicintoUser/{id}' , 'UserController@addRepublicintoUser'); // adiciona Republica em Usuario
Route::put('removeRepublicfromUser/{id}' , 'UserController@removeRepublicfromUser'); // remove Republica de Usuario

Route::put('addCommentintoUser/{id}' , 'CommentController@addCommentintoUser'); //adiciona Comentario em Usuario
Route::put('removeCommentfromUserc/{id}' , 'CommentController@removeCommentfromUser'); //Remove Comentario de Usuario

Route::put('addCommentintoRepublic/{id}' , 'CommentController@addCommentintoRepublic'); //adiciona comentario em Republica
Route::put('removeCommentfromRepublic/{id}' , 'CommentController@removeCommentfromRepublic'); //Remove comentario de Republica

//Rotas para Passport
Route::post('registerUser', 'API\PassportController@registerUser');
Route::post('registerRepublic', 'API\PassportController@registerRepublic');

// Route::put('updateUsuario', 'API\PassportController@updateUser');
Route::post('loginUser', 'API\PassportController@login');
Route::group(['middleware'=>'auth:api'], function(){
  Route::post('logout', 'API\PassportController@logout');
  Route::post('getDetails', 'API\PassportController@getDetails');
});
