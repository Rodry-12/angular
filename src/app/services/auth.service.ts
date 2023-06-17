import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${environment.API_URL}/api/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  loginAndProfile(email: string, password: string) {
    return this.http.post<Auth>(`${this.url}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token)),
      switchMap(user => {
        // let headers = new HttpHeaders();
        // headers = headers.set('Authorization', `Bearer ${user.access_token}`);
        // headers = headers.set('Content-type', 'application/json');

        return this.http.get<User>(`${this.url}/profile`, { context: checkToken() });
      })
    )

  }

  // profile( token: string ) {
  //   const headers = new HttpHeaders();
  //   headers.set('Authorization', `Bearer ${token}`);
  //   headers.set('Content-type', `application/json`);

  //   return this.http.get<User>(`${this.url}/profile`, { headers: headers });
  // }

  getProfile(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.url}/profile`, { headers });
  }

  // getHttpHeaders() {
  //   const token = localStorage.getItem('platzi_token');
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     })
  //   };
  // }

}
