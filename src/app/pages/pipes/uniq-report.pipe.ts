import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { VeterinaryReport } from 'src/app/interfaces/VeterinaryReport';

@Pipe({
  name: 'uniqReport',
  standalone: true
})
export class UniqReportPipe implements PipeTransform {

    transform(animal: Animal, ...args: unknown[]): Animal {

        let newAnimal: Animal = animal

        let recent: string = '1901-01-01'

        animal.veterinaryReports?.forEach(v => {
            if (v.date > recent) {
                newAnimal.veterinaryReports = [v]
                recent = v.date
            }
        })

        if (newAnimal.veterinaryReports?.length === 0) newAnimal.veterinaryReports = [
            {
                id: 0,
                date: '',
                detail: '',
                gramage: 0,
                food: {
                    id: 0,
                    name: "",
                }
            }
        ]
        
        return newAnimal

    }

}
