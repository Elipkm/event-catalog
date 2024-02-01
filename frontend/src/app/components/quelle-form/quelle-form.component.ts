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
  clipFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private quelleService: QuelleService){
    this.dataForm = this.fb.group({});
    this.clipFormGroup = this.fb.group({});
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
      this.clipFormGroup.reset();
      this.dataForm.patchValue(this.quelle);
    } else {
      this.dataForm.reset();
      this.clipFormGroup.reset();
    }

  }


  ngOnDestroy(){
    this.cancel();
  }

  initializeForm(): void {
    this.clipFormGroup = this.fb.group({
      x: new FormControl(),
      y: new FormControl(),
      width: new FormControl(),
      height: new FormControl()
    });
    this.dataForm = this.fb.group({
      id: new FormControl({value: "", disabled: true}),
      name: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      viewport_width: new FormControl(),
      viewport_height: new FormControl(),
      fullPage: new FormControl(false),
      clip: this.clipFormGroup,
      multipleClips: new FormControl(false),
      targetNumberOfClipsX: new FormControl(),
      targetNumberOfClipsY: new FormControl(),
      optimizeSpeed: new FormControl(false)
    });

  }

  save(){
    let resultingQuelle: Quelle = this.dataForm.getRawValue();
    resultingQuelle.clip = this.clipFormGroup.getRawValue();
    if(resultingQuelle.clip?.x == undefined || resultingQuelle.clip?.y == undefined 
      || resultingQuelle.clip?.width == undefined || resultingQuelle.clip?.height == undefined){
      resultingQuelle.clip = undefined;
    }
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
    this.clipFormGroup.reset();
    this.quelle = undefined;
    this.quelleChange.emit(this.quelle);
    this.neu = false;
    this.neuChange.emit(this.neu);
  }
  
}
