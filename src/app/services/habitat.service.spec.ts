import { TestBed, inject } from '@angular/core/testing';

import { HabitatService } from './habitat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HabitatService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HabitatService]
    });
  });

  it('should be created', inject([HabitatService], (habitatService: HabitatService) => {
    expect(habitatService).toBeTruthy();
  }));

});
