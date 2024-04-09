import { Pipe, PipeTransform } from '@angular/core';
import { VeterinaryReport } from 'src/app/interfaces/VeterinaryReport';

@Pipe({
    name: 'filters',
    standalone: true
})
export class FiltersPipe implements PipeTransform {

    transform(value: VeterinaryReport[] | null, ...args: string[]): VeterinaryReport[] {
        console.log(args[0], value)
        return value ? value.filter(v => v.date = args[0]) : []
    }

}
