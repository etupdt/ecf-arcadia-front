import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatCardComponent } from './habitat-card.component';

describe('HabitatCardComponent', () => {
  let component: HabitatCardComponent;
  let fixture: ComponentFixture<HabitatCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitatCardComponent]
    });
    fixture = TestBed.createComponent(HabitatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
