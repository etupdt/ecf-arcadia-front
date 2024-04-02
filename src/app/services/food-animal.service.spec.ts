import { TestBed } from '@angular/core/testing';

import { FoodAnimalService } from './food-animal.service';

describe('FoodAnimalService', () => {
  let service: FoodAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
