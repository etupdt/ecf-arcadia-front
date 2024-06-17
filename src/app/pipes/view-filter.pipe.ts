import { Pipe, PipeTransform } from '@angular/core';
import { IView } from '../interfaces/IView';

@Pipe({
  name: 'viewFilter',
  standalone: true
})
export class ViewFilterPipe implements PipeTransform {

  transform(value: IView[] | null, ...args: unknown[]): IView[] {
    return value ? value!.filter(view => view.isVisible) : []
  }

}
