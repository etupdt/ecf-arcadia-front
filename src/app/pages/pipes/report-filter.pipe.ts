import { Pipe, PipeTransform } from '@angular/core';
import { VeterinaryReport } from 'src/app/interfaces/VeterinaryReport';
import * as _ from 'lodash';
import { Animal } from 'src/app/interfaces/Animal';

@Pipe({
    name: 'reportFilter',
    standalone: true
})
export class ReportFilterPipe implements PipeTransform {

    
    transform(value: VeterinaryReport[] | null, ...args: any[]): VeterinaryReport[] {

        const veterinariesReport: VeterinaryReport[] = value ? value : []

        const valueByDate: VeterinaryReport[] = veterinariesReport.filter(v => 
            v.date === args[0] || !args[0]
        )

        return valueByDate

    }

}
