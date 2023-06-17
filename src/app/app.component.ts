import { Component } from '@angular/core';
import { Product } from './interfaces/product.interface';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { CreateUserDTO, User } from './interfaces/user.interface';
import { ArchivosService } from './services/archivos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  toogleShow: boolean = true;

  constructor(
    private archivosService: ArchivosService
   ) { }

  onLoaded(img : string) {
    console.log("Img Father loaded", img);
  }

  toogleImage() {
    this.toogleShow = !this.toogleShow;
  }

  descargar() {
    this.archivosService.getFile("myPDF.pdf", 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe(() => console.log("Descargado"));
  }

  onLoad(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.archivosService.uploadFile(file)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

}
