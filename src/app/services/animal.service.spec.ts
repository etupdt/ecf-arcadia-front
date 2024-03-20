import { TestBed, inject } from '@angular/core/testing';

import { AnimalService } from './animal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnimalService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnimalService]
    });
  });

  it('should be created', inject([AnimalService], (animalService: AnimalService) => {
    expect(animalService).toBeTruthy();
  }));

});
