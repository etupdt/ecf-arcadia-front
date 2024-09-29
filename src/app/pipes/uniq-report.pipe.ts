import { Pipe, PipeTransform } from '@angular/core';
import { IAnimal } from 'src/app/interfaces/IAnimal';
import { VeterinaryReport } from 'src/app/models/VeterinaryReport';

@Pipe({
  name: 'uniqReport',
  standalone: true
})
export class UniqReportPipe implements PipeTransform {

    transform(animal: IAnimal, ...args: unknown[]): IAnimal {

        let newAnimal: IAnimal = animal

        let recent: string = '1901-01-01'

        animal.veterinaryReports?.forEach(v => {
            if (v.date > recent) {
                newAnimal.veterinaryReports = [v]
                recent = v.date
            }
        })

        if (newAnimal.veterinaryReports?.length === 0) newAnimal.veterinaryReports = [new VeterinaryReport()]
        
        return newAnimal

    }

}
