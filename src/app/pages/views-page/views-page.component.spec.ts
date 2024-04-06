import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsPageComponent } from './views-page.component';

describe('ViewsPageComponent', () => {
  let component: ViewsPageComponent;
  let fixture: ComponentFixture<ViewsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewsPageComponent]
    });
    fixture = TestBed.createComponent(ViewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
