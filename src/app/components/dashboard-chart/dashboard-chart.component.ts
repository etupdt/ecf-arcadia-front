import { Component, Input } from '@angular/core';
import { ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-dashboard-chart',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './dashboard-chart.component.html',
    styleUrl: './dashboard-chart.component.scss'
})
export class DashboardChartComponent {
    
    @Input() type!: keyof ChartTypeRegistry
    @Input() labels!: string[]
    @Input() datasets!: any[]
    @Input() options!: {}

}
