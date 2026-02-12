import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
    }
  });
  if (req.url.includes('/auth')) {
    return next(req);
  }else{
    return next(cloneRequest);
  }
};
