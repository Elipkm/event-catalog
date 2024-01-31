import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { QuelleImages } from '../../models/quelle-images.model';
import { QuelleImagesService } from '../../services/quelle-images.service';
import { QuelleService } from '../../services/quelle.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  myQuelleImages!: QuelleImages;

  constructor(private router: Router, private quelleService: QuelleService, private quelleImagesService: QuelleImagesService) {}
  goToKatalog() {
    this.router.navigate(['katalog'], {state: this.myQuelleImages});
  }
  goToQuellen() {
    this.router.navigate(['quellen']);
  }

  updateKatalog(){
    console.log("updat katalog.....")
  }

  downloadKatalog(){
    console.log("download katalog.....")
  }
}
