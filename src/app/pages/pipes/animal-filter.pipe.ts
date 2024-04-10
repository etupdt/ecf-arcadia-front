import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import * as _ from 'lodash';
import { Dropdown } from 'src/app/interfaces/Dropdown';

@Pipe({
    name: 'animalFilter',
    standalone: true
})
export class AnimalFilterPipe implements PipeTransform {

    transform(animals: Animal[] | null, ...args: any[]): Animal[] {

        let animalsToReturn = animals ? animals : []

        animalsToReturn = args[0] && args[0] !== '' ? animalsToReturn.filter(a => 
            _.intersectionBy(a.veterinaryReports, [{date: args[0]}], 'date').length > 0 
        ) : animalsToReturn.filter(a => a.veterinaryReports!.length > 0)

        animalsToReturn = args[1] && args[1].length > 0 ? _.intersectionBy(animalsToReturn, args[1], 'id') 
        : animalsToReturn.filter(a => a.veterinaryReports!.length > 0)
        
        return animalsToReturn

    }

}
