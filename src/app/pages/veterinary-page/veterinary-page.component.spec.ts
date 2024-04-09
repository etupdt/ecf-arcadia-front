import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryPageComponent } from './veterinary-page.component';

describe('VeterinaryPageComponent', () => {
  let component: VeterinaryPageComponent;
  let fixture: ComponentFixture<VeterinaryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinaryPageComponent]
    });
    fixture = TestBed.createComponent(VeterinaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
