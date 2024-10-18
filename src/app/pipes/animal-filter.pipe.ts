import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { IAnimal } from 'src/app/interfaces/IAnimal';

@Pipe({
    name: 'animalFilter',
    standalone: true
})
export class AnimalFilterPipe implements PipeTransform {

    transform(animals: IAnimal[] | null, ...args: any[]): IAnimal[] {

        console.log('filter animal', animals, args)
        let animalsToReturn = animals ? animals : []

        animalsToReturn = args[0] && args[0] !== '' ? animalsToReturn.filter(a => 
            _.intersectionBy(a.veterinaryReports, [{date: args[0]}], 'date').length > 0 
        ) : animalsToReturn.filter(a => a.veterinaryReports!.length > 0)

        animalsToReturn = args[1] && args[1].length > 0 ? _.intersectionBy(animalsToReturn, args[1], 'id') 
        : animalsToReturn.filter(a => a.veterinaryReports!.length > 0)
        
        console.log('filter animalsToReturn', animalsToReturn)
        return animalsToReturn

    }

}
