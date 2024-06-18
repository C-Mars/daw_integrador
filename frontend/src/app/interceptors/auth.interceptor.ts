import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    const token: string | null = sessionStorage.getItem('token');

    if (token) {
      const headers = req.headers.set('Authorization', 'Bearer ' + token);
        const cloned = req.clone({ headers });

        return next(cloned);
    }
  }

 return next(req);
};