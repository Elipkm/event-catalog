import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { QuelleImages } from '../../models/quelle-images.model';
import { KatalogService } from '../../services/katalog.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  myQuelleImages!: QuelleImages;
  updatingKatalog: boolean = false;

  constructor(private router: Router,
     private katalogService: KatalogService, private messageService: MessageService) {}
  goToKatalog() {
    this.router.navigate(['katalog'], {state: this.myQuelleImages});
  }
  goToQuellen() {
    this.router.navigate(['quellen']);
  }

  updateKatalog(){
    console.log("updat katalog.....")
    this.updatingKatalog = true;
    this.katalogService.updateKatalog().subscribe((resp) => {
      console.log("katalog updated");
      console.log(resp);
      this.messageService.add({severity:'success', summary: 'Neuer Katalog', detail: 'Katalog wurde erfolgreich aktualisiert'});
      this.updatingKatalog = false;
    });
  }

  downloadKatalog(){
    console.log("download katalog.....")
  }
}
