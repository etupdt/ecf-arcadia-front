import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatFormComponent } from './habitat-form.component';

describe('HabitatFormComponent', () => {
  let component: HabitatFormComponent;
  let fixture: ComponentFixture<HabitatFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitatFormComponent]
    });
    fixture = TestBed.createComponent(HabitatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
