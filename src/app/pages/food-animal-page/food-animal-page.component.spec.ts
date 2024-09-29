import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodAnimalPageComponent } from './food-animal-page.component';

describe('FoodAnimalPageComponent', () => {
  let component: FoodAnimalPageComponent;
  let fixture: ComponentFixture<FoodAnimalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodAnimalPageComponent]
    });
    fixture = TestBed.createComponent(FoodAnimalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
