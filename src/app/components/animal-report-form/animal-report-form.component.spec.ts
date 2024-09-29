import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalReportFormComponent } from './animal-report-form.component';

describe('AnimalReportFormComponent', () => {
  let component: AnimalReportFormComponent;
  let fixture: ComponentFixture<AnimalReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalReportFormComponent]
    });
    fixture = TestBed.createComponent(AnimalReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
