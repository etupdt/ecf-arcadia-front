import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Habitat } from '../interfaces/Habitat';
import { environment } from 'src/environments/environment';
import { HabitatService } from './habitat.service';
import { Animal } from '../interfaces/Animal';

describe('HabitatService', () => {

  let httpTestingController: HttpTestingController
  let habitatService: HabitatService
    
  const habitat: Habitat = {
    "id": 1,
    "name": "Jungle",
    "description": "Chaud et humide",
    "comment": "Humide et chaud", 
    "images": [
        {
            "id": 13,
            "imageName": "76e21db1937e543b62f7f942534a1b9c_habitat_Jungle.jpeg"
        }
    ],
    "animals": []
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    })

    habitatService = TestBed.inject(HabitatService);
    httpTestingController = TestBed.inject(HttpTestingController)

  })

  it('#postData should return status 200', (done) => {
  
    habitatService.postHabitat(habitat).subscribe(data => {
      expect(data).toEqual(habitat)    
    }); 

    const req = httpTestingController.expectOne(environment.useBackend + '/api/habitats');

    expect(req.request.method).toEqual('POST');

    req.flush(habitat);

    done()
  
  })

  afterEach(() => {
    httpTestingController.verify();
  });

})
