import { TestBed, flush, inject, waitForAsync } from '@angular/core/testing';

import { AnimalService } from './animal.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AnimalService', () => {

  let httpTestingController: HttpTestingController

  let flag: boolean = false

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    })
  
    httpTestingController = TestBed.inject(HttpTestingController)
  
  })
  
  it('should give name', waitForAsync(inject([AnimalService], (animalService: AnimalService) => {

    animalService = TestBed.inject(AnimalService);

    animalService.getAnimals().subscribe({
      
      next : data => {
        console.log('toto')  

        flag = true
        const animal = data   
        console.log('toto')

        expect(animal.id).toEqual(7)
        
      },
      error: error => {
        console.error(error)      
      }

    });   
    
    // setTimeout (() => {

    // },10000)

    const testRequest = httpTestingController.expectOne(environment.useBackend + '/api/animals');
console.log(testRequest)
    expect(7).toEqual(7)

    testRequest.flush
    
  })))

});
