import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
    let service: ApiService<User>;
    let httpController: HttpTestingController;
    let get: Observable<any>
    const url = 'http://localhost:8080/'

    let mock = User.deserialize({
        "id": 1,
        "firstname": "José",
        "lastname": "Duseaux",
        "email": "admin@test.com",
        "role": "ADMIN"
    }, 1)

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });
        service = TestBed.inject(ApiService<User>);
        httpController = TestBed.inject(HttpTestingController)
        get = service.getItem('user', 1)
    });

    it('should be read', () => {
        service.getItem('users', 1).subscribe({
            next: (result: User) => {
                expect(result.firstname).toEqual('José');
            }
        })

	    const req = httpController.expectOne({
            method: 'GET',
            url: `${url}ecf-arcadia-back/api/users/1`,
        });
  
        req.flush(mock);
      
    })
    
});
