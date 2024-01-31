import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuellenOverviewComponent } from './quellen-overview.component';

describe('QuellenOverviewComponent', () => {
  let component: QuellenOverviewComponent;
  let fixture: ComponentFixture<QuellenOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuellenOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuellenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
