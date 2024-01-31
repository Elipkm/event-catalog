import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuelleFormComponent } from './quelle-form.component';

describe('QuelleFormComponent', () => {
  let component: QuelleFormComponent;
  let fixture: ComponentFixture<QuelleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuelleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuelleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
