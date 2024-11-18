import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, Colors } from 'chart.js';
import { DashboardChartComponent } from 'src/app/components/dashboard-chart/dashboard-chart.component';
import { DashboardMixedChartComponent } from 'src/app/components/dashboard-mixed-chart/dashboard-mixed-chart.component';
import { ErrorModalComponent } from 'src/app/modals/error-modal/error-modal.component';
import { AnimalStatistic } from 'src/app/models/AnimalStatistic';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
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
        private authService: AuthService,
        private route: ActivatedRoute,
        public datepipe: DatePipe,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {

        this.headerService.selectedMenuItem =  this.authService.user.role
        this.headerService.signalItemSelected.set( this.authService.user.role)
        const path = this.route.snapshot.routeConfig ? this.route.snapshot.routeConfig.path : ''
        this.headerService.selectedSubMenuItem = path ? path : ''
        this.headerService.signalSubItemSelected.set(path ? path : '')

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

                for (let [k, val] of byDate.entries()) {
                    this.datesLabels.push(k)
                }
                for (let [key, value] of byAnimal.entries()) {
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
            },
            error: (error: { error: { message: any; }; }) => {
                const modal = this.modalService.open(ErrorModalComponent)
                modal.componentInstance.message = error.error.message;
            }
        })
    }

}
