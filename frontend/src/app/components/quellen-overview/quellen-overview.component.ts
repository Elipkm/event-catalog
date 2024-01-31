import { Component } from '@angular/core';
import { QuelleService } from '../../services/quelle.service';
import { Quelle } from '../../models/quelle.model';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { QuelleFormComponent } from '../quelle-form/quelle-form.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-quellen-overview',
  standalone: true,
  imports: [ButtonModule, QuelleFormComponent, HttpClientModule],
  providers: [HttpClientModule],
  templateUrl: './quellen-overview.component.html',
  styleUrl: './quellen-overview.component.css'
})
export class QuellenOverviewComponent {

  quellen: Quelle[] = [];
  editQuelle?: Quelle;
  neueQuelle: boolean = false;

  constructor(private quelleService: QuelleService, private router: Router) {}

  ngOnInit(){
    this.loadQuellen();
  }
  ngOnChanges(){
    this.loadQuellen();
  }
  loadQuellen(saved?: any){
    console.log("loadQuellen")
    this.quelleService.getQuellen().subscribe((quellen: Quelle[]) => {
      console.log("quellen", quellen);
      this.quellen = quellen;
    });
  }
  edit(quelle: Quelle){
    this.neueQuelle = false;
    this.editQuelle = quelle;
  }

  delete(quelle: Quelle): void{
    this.quelleService.delete(quelle)
    .subscribe(() => {
      this.loadQuellen();
    });
  }

  setNeueQuelle(){
    this.editQuelle = undefined;
    this.neueQuelle = true;
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
