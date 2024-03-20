import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HabitatService } from 'src/app/services/habitat.service';

describe('HomePageComponent', () => {

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
