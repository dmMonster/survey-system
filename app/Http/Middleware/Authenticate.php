<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param $request
     */
    protected function redirectTo($request):void
    {
        if (! $request->expectsJson()) {
            //prevent redirect if not authenticated.
            throw  new HttpResponseException(response('Unauthorized', 401));
           // return route('login');
        }
    }
}
