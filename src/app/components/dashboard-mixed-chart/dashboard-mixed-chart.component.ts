import { Component, Input } from '@angular/core';
import { ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-dashboard-mixed-chart',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './dashboard-mixed-chart.component.html',
    styleUrl: './dashboard-mixed-chart.component.scss'
})
export class DashboardMixedChartComponent {

    @Input() type: keyof ChartTypeRegistry = "line"
    @Input() labels!: string[]
    @Input() datasets!: any[]
    @Input() options!: {}

}
