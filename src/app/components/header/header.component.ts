import { Component, OnInit } from '@angular/core';
import { CreateUserDTO } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activemenu: boolean = false;
  counter: number = 0;
  token: string = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private userService: UsersService
  ) { }

  ngOnInit(  ): void {
    this.storeService.myCar$.subscribe(productos => {
      this.counter = productos.length;
    })
  }

  toggleMenu() {
    this.activemenu = !this.activemenu;
  }

  createUser() {
    const user: CreateUserDTO = {
      name: 'Rodrigo Jimenez',
      email: 'rodrigo@gmail.com',
      password: 'rodri123'
    }

    this.userService.create(user)
    .subscribe(user => {
      console.log("User created", user);
    });
  }

  login() {
    this.authService.loginAndProfile('rodrigo@gmail.com', 'rodri123')
    .subscribe(user => {
      console.log("Profile", user);
    });
  }

  getProfile() {
    this.authService.getProfile(this.token)
    .subscribe(user => {
      console.log("Profile", user);
    })
  }
}
