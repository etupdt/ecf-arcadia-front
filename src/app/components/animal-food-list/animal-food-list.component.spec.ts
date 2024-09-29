import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFoodListComponent } from './animal-food-list.component';

describe('AnimalFoodListComponent', () => {
  let component: AnimalFoodListComponent;
  let fixture: ComponentFixture<AnimalFoodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalFoodListComponent]
    });
    fixture = TestBed.createComponent(AnimalFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
