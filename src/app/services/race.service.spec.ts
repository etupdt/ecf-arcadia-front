import { TestBed, inject } from '@angular/core/testing';

import { RaceService } from './race.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RaceService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RaceService]
    });
  });

  it('should be created', inject([RaceService], (raceService: RaceService) => {
    expect(raceService).toBeTruthy();
  }));

});
