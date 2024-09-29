import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMixedChartComponent } from './dashboard-mixed-chart.component';

describe('DashboardMixedChartComponent', () => {
  let component: DashboardMixedChartComponent;
  let fixture: ComponentFixture<DashboardMixedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMixedChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMixedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
