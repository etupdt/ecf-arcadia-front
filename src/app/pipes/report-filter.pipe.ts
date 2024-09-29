import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { IVeterinaryReport } from 'src/app/interfaces/IVeterinaryReport';

@Pipe({
    name: 'reportFilter',
    standalone: true
})
export class ReportFilterPipe implements PipeTransform {

    
    transform(value: IVeterinaryReport[] | null, ...args: any[]): IVeterinaryReport[] {

        const veterinariesReport: IVeterinaryReport[] = value ? value : []

        const valueByDate: IVeterinaryReport[] = veterinariesReport.filter(v => 
            v.date === args[0] || !args[0]
        )

        return valueByDate

    }

}
