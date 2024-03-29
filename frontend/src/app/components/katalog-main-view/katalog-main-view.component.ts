import { ChangeDetectorRef, Component, Input, OnInit, PlatformRef } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { QuelleImages } from '../../models/quelle-images.model';
import { QuelleMockService } from '../../services/quelle-mock.service';
import { QuelleApiService } from '../../services/quelle-api.service';
import { QuelleService } from '../../services/quelle.service';
import { QuelleImagesService } from '../../services/quelle-images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Quelle } from '../../models/quelle.model';

@Component({
  selector: 'app-katalog-main-view',
  standalone: true,
  imports: [GalleriaModule, ButtonModule, DropdownModule, FormsModule
   ],
  templateUrl: './katalog-main-view.component.html',
  styleUrl: './katalog-main-view.component.css',
})
export class KatalogMainViewComponent implements OnInit {

  position: any = "'bottom'";
  activeIndex: number = 0;

  selectedQuelleImages?: QuelleImages;
  selectedQuelle?: Quelle;

  quellenDropDownOptions: SelectItem[] = [];


  constructor(private router: Router, private quelleService: QuelleService, private quelleImagesService: QuelleImagesService) {}

  ngOnInit() {
    this.quelleService.getQuellen().forEach((quellenList: Quelle[]) => {
      this.quellenDropDownOptions.push({label: "---", value: undefined});
      this.quellenDropDownOptions.push(...quellenList.map((quelle) => {return {label: quelle.name, value: quelle}}));
    }); 
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  updateImages(event: any) {
    if(!this.selectedQuelle){
      this.selectedQuelleImages = undefined;
      return;
    }
    this.activeIndex = 0;
    this.quelleImagesService.getQuelleImages(this.selectedQuelle).subscribe((quelleImages?: QuelleImages) => {
      this.selectedQuelleImages = quelleImages;
    });
  }
  changeIndex(event: any) {
    if(this.selectedQuelleImages) {
      this.activeIndex = event;
      if(this.activeIndex >= this.selectedQuelleImages.imagesId.length) {
        this.activeIndex = 0;
      }
    }
  }

}
