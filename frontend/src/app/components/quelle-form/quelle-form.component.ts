import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quelle } from '../../models/quelle.model';
import { ButtonModule } from 'primeng/button';
import { QuelleService } from '../../services/quelle.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quelle-form',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './quelle-form.component.html',
  styleUrl: './quelle-form.component.css'
})
export class QuelleFormComponent {

  @Input() quelle?: Quelle;
  @Output() quelleChange: EventEmitter<Quelle> = new EventEmitter<Quelle>();

  @Input() neu?: boolean;
  @Output() neuChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() saved: EventEmitter<boolean> = new EventEmitter<boolean>();

  dataForm: FormGroup;

  constructor(private fb: FormBuilder, private quelleService: QuelleService){
    this.dataForm = this.fb.group({});
  }

  ngOnInit(){
    this.initializeForm();
  }

  ngOnChanges(){

    if(this.neu){
      this.dataForm.reset();
    }

    if(this.quelle){
      console.log("patch")
      console.log("quelle", this.quelle);
      this.dataForm.patchValue(this.quelle);
    } else {
      this.dataForm.reset();
    }

  }


  ngOnDestroy(){
    this.cancel();
  }

  initializeForm(): void {
    this.dataForm = this.fb.group({
      id: new FormControl({value: "", disabled: true}),
      name: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      resolution_width: new FormControl(""),
      resolution_height: new FormControl(""),
      anzahl_bilder: new FormControl("")
    });
  }

  save(){
    let resultingQuelle: Quelle = this.dataForm.getRawValue();
    console.log("save quelle", resultingQuelle);

    if(resultingQuelle){
      this.quelleService.save(resultingQuelle).subscribe(() => {
        this.cancel();
        this.saved.emit(true);
      });
    }
  }

  cancel(){
    this.dataForm.reset();
    this.quelle = undefined;
    this.quelleChange.emit(this.quelle);
    this.neu = false;
    this.neuChange.emit(this.neu);
  }
  
}
