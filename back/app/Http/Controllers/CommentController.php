<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\User;
use App\Republic;

class CommentController extends Controller
{
      //chama o comando para criar um novo comentario
    public function createComment(Request $request){
      $comment = new Comment;
      $comment->createComment($request);
    return response()->json([$comment]);
    }

    //estabelece uma relação entre comentario e Usuario
    public function addCommentintoUser(Request $request, $id){
      $comment = Comment::find($id);
        if($request->user_id){
          $comment->user_id = $request->user_id;
        }
      $comment->save();
    return response()->json(['Efetuado com sucesso!']);
    }

    //remove uma relação entre comentario e locatario
    public function removeCommentfromUser(Request $request, $id){
      $comment = Comment::find($id);

      if($request->user_id){
        $comment->User_id = null;
      }
      $comment->save();
    return response()->json(['Efetuado com sucesso!']);
    }

    //estabelece uma relação entre comentario e republica
    public function addCommentintoRepublic(Request $request, $id){
      $comment = Comment::find($id);
      if($request->republic_id){
        $comment->republic_id = $request->republic_id;
      }
      $comment->save();
    return response()->json(['Efetuado com sucesso!']);
    }

    //remove uma relação entre comentario e republica
    public function removeCommentfromRepublic(Request $request, $id){
      $comment = Comment::find($id);

      if($request->republic_id){
        $comment->republic_id = null;
      }
      $comment->save();
    return response()->json(['Efetuado com sucesso!']);
    }
}
