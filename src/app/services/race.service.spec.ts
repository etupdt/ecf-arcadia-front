import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Data } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can test HttpClient.get', () => {
    const testData: Data = {name: 'Test Data'};
  
    httpClient.get<Data>('/')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
  
    const requests = httpTestingController.match('/');
    expect(requests.length).toBeGreaterThan(0);
  
    // console.log('requests length : ', requests.length)
    // console.log('request : ', requests[0].request.headers.getAll)
    
    requests.forEach(request => {
      // console.log(request)
      request.flush
    })

    httpTestingController.verify()
    
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
