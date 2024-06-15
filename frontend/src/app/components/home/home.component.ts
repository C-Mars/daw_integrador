import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { FotoService } from '../../services/foto.service';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    LoginComponent,
    ButtonModule,
    NgIf,
    GalleriaModule, CardModule, ImageModule],
  providers:[FotoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // ver el modal del login
  displayLogin = false;

  images: any[] | undefined;

  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  constructor(private _fotoService:FotoService){}
  
  
  ngOnInit() {
    this._fotoService.getImages().then((images) => {
        this.images = images;
    });
}
   
  showLogin() {
    this.displayLogin = true;
  }


}
