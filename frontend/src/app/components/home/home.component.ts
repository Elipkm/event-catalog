import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { QuelleImages } from '../../models/quelle-images.model';
import { KatalogService } from '../../services/katalog.service';
import { MessageService } from 'primeng/api';
import { Quelle } from '../../models/quelle.model';
import { QuelleService } from '../../services/quelle.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, ListboxModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  updatingKatalog: boolean = false;
  quellen: Quelle[] = [];
  selectedQuellen: Quelle[] = [];

  constructor(private router: Router, quelleService: QuelleService,
     private katalogService: KatalogService, private messageService: MessageService) {
      quelleService.getQuellen().subscribe((quellen: Quelle[]) => {
        this.quellen = quellen;
      })
  }
  goToKatalog() {
    this.router.navigate(['katalog']);
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

  updateKatalogQuellen(){
    this.updatingKatalog = true;
    this.katalogService.updateKatalogSpecificQuellen(this.selectedQuellen).subscribe((resp) => {
      console.log("katalog updated");
      console.log(resp);
      this.messageService.add({severity:'success', summary: 'Katalog-Update', detail: 'Katalog wurde erfolgreich aktualisiert'});
      this.updatingKatalog = false;
    });
  }

  downloadKatalog(){
    console.log("download katalog.....")
  }
}
