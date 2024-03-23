import { TestBed, fakeAsync, flush } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })  
  
  })  
  
  it('should give name - fakeAsync', fakeAsync(() => {
    
    const homePageComponent = TestBed.createComponent(HomePageComponent);
    
    const button = homePageComponent.debugElement
    .query(By.css('#button'))
  
    const pseudo: HTMLElement = homePageComponent.debugElement
    .query(By.css('#pseudo'))
    .nativeElement
    
    pseudo.textContent = 'Tuti'  

    const view: HTMLElement = homePageComponent.debugElement
      .query(By.css('#view'))
      .nativeElement

    view.textContent = "C'est un test"  

    expect(pseudo.textContent).toEqual('Tuti')

    button.triggerEventHandler('click', null)
  
    homePageComponent.whenStable().then(() => {
      homePageComponent.detectChanges();
      const value = homePageComponent.debugElement
        .query(By.css('#pseudo'))
        .nativeElement
        .innerText;
      expect(value).toEqual('');
    });

    flush()
  }));

});
