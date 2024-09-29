import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatsPageComponent } from './habitats-page.component';

describe('HabitatsPageComponent', () => {
  let component: HabitatsPageComponent;
  let fixture: ComponentFixture<HabitatsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitatsPageComponent]
    });
    fixture = TestBed.createComponent(HabitatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
