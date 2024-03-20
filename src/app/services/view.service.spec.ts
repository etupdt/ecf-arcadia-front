import { TestBed, inject } from '@angular/core/testing';
import { ViewService } from './view.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewService]
    });
  });

  it('should be created', inject([ViewService], (viewService: ViewService) => {
    expect(viewService).toBeTruthy();
  }));

});
