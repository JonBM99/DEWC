import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // o sessionStorage

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
