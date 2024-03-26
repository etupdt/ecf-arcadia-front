import { TestBed, inject } from '@angular/core/testing';

import { ServiceService } from './service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService]
    });
  });

  it('should be created', inject([ServiceService], (serviceService: ServiceService) => {
    expect(serviceService).toBeTruthy();
  }));

});
