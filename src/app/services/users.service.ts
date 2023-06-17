import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string = `${environment.API_URL}/api/users`

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<User[]>(this.url);
  }

  create(user: CreateUserDTO) {
    return this.http.post<User>(this.url, user);
  }
}
