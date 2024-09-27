import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFoodFormComponent } from './animal-food-form.component';

describe('AnimalFoodFormComponent', () => {
  let component: AnimalFoodFormComponent;
  let fixture: ComponentFixture<AnimalFoodFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalFoodFormComponent]
    });
    fixture = TestBed.createComponent(AnimalFoodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
