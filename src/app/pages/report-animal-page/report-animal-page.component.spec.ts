import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnimalPage } from './report-animal-page.component';

describe('ReportAnimalPage', () => {
  let component: ReportAnimalPage;
  let fixture: ComponentFixture<ReportAnimalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportAnimalPage]
    });
    fixture = TestBed.createComponent(ReportAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
