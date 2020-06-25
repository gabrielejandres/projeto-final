<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Auth;

class ROLES
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      $user=Auth::user();

      if($user->is_locator==1 && $user->republic_id==$request->id)
        return $next($request);
      else{
        return response()->json(['voce nao e locator, nao tem permissao para deletar essa Republica']);
      }
    }
}
