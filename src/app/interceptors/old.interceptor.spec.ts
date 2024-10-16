import { TestBed } from '@angular/core/testing';

import { OldInterceptor } from './old.interceptor';

describe('OldInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OldInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OldInterceptor = TestBed.inject(OldInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
