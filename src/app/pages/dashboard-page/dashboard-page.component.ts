import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DashboardChartComponent } from 'src/app/components/dashboard-chart/dashboard-chart.component';
import { AnimalStatistic } from 'src/app/models/AnimalStatistic';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DashboardChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {

    chartData!: ChartConfiguration<any>['data']

    animalsLabels!: string[]
    animalsDatasets!: {}[]

    constructor (
        private animalStatisticService: ApiService<AnimalStatistic>,
        private headerService: HeaderService
    ) {}

    ngOnInit() {
        this.animalStatisticService.getItems('animals/statistics').subscribe({
            next: (res: AnimalStatistic[]) => {
                const byAnimal: Map<string, number> = new Map()
                const labels: string[] = []
                const data: number[] = []
                res.forEach(element => {
                    let animal = byAnimal.get(element.firstname)
                    byAnimal.set(element.firstname, animal ? animal + element.qty : element.qty)
                })
                for (let [key, value] of byAnimal.entries()) {
                    labels.push(key)
                    data.push(value)
                }
                this.animalsLabels = labels
                this.animalsDatasets = [{
                    data: data,
                    label: 'Like',
                    backgroundColor: ["lightpink", "lightblue", "lightgreen", "lightblue", "lightpink", "lightgreen"] 
                }]
            },
            error: (error: { error: { message: any; }; }) => {
                this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
            }
        })
    }

}
