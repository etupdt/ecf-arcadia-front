import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, Colors } from 'chart.js';
import { DashboardChartComponent } from 'src/app/components/dashboard-chart/dashboard-chart.component';
import { DashboardMixedChartComponent } from 'src/app/components/dashboard-mixed-chart/dashboard-mixed-chart.component';
import { AnimalStatistic } from 'src/app/models/AnimalStatistic';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DashboardChartComponent, DashboardMixedChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {

    // chartData!: ChartConfiguration<any>['data']

    animalsLabels!: string[]
    animalsDatasets!: {}[]

    datesLabels: string[] = []
    datesDatasets: {}[] = []

    constructor (
        private animalStatisticService: ApiService<AnimalStatistic>,
        private headerService: HeaderService,
        public datepipe: DatePipe
    ) {}

    ngOnInit() {

        Chart.register(Colors)

        this.animalStatisticService.getItems('animals/statistics').subscribe({
            next: (res: AnimalStatistic[]) => {
                const byAnimal: Map<string, number> = new Map()
                const byDate: Map<string, Map<string, number>> = new Map()
                const animalsLabels: string[] = []
                const data: number[] = []
                const datesDatasets: {}[] = []
                let dataDate: number[] = []

                let date = ''
                
                const depth = 7

                let dat = new Date()
                dat.setDate(dat.getDate() - depth)
                
                for (let i = -depth; i < 0; i++) {
                    dat.setDate(dat.getDate() + 1)
                    console.log(this.datepipe.transform(dat, 'y-MM-dd'))
                    const datLib = this.datepipe.transform(dat, 'y-MM-dd')
                    byDate.set(datLib ? datLib : '', new Map())
                }    

                res.forEach(element => {
                    let animal = byAnimal.get(element.firstname)
                    byAnimal.set(element.firstname, animal ? animal + element.qty : element.qty)
                    let map = byDate.get(element.date)
                    if (map) {
                        map.set(element.firstname, element.qty)
                        byDate.set(element.date, map)
                    }
                })

                for (let [key, value] of byAnimal.entries()) {
                    animalsLabels.push(key)
                    data.push(value)
                }
                this.animalsLabels = animalsLabels
                this.animalsDatasets = [{
                    data: data,
                    label: 'like',
                    borderColor: 'lightgray',
                    backgroundColor: "lightblue"
                }]
                console.log(this.animalsLabels, this.animalsDatasets)

                for (let [k, val] of byDate.entries()) {
                    this.datesLabels.push(k)
                }
                for (let [key, value] of byAnimal.entries()) {
                    console.log(key)
                    dataDate = []
                    for (let [k, val] of byDate.entries()) {
                        const v = val.get(key)
                        dataDate.push(v ? v : 0)
                    }
                    datesDatasets.push({
                        data: dataDate,
                        label: key,
                        type: 'line'
                    })
                }
                this.datesDatasets = datesDatasets
                console.log(this.datesLabels, this.datesDatasets)
            },
            error: (error: { error: { message: any; }; }) => {
                this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
            }
        })
    }

}
