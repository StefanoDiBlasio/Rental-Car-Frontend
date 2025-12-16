import { HttpInterceptorFn } from '@angular/common/http';
import { Storage } from '../services/storage/storage';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = Storage.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
