import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogMainViewComponent } from './katalog-main-view.component';

describe('KatalogMainViewComponent', () => {
  let component: KatalogMainViewComponent;
  let fixture: ComponentFixture<KatalogMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatalogMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KatalogMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
