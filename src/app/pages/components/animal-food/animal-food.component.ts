import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Animal } from 'src/app/interfaces/Animal';
import { AnimalService } from 'src/app/services/animal.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-animal-food',
    templateUrl: './animal-food.component.html',
    styleUrls: ['./animal-food.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ]
})
export class AnimalFoodComponent {

    @Input() animal!: Animal
    @Input() updatable: Boolean = false

    @Output() updateanimalList: EventEmitter<number> = new EventEmitter()
    
    constructor (
        private animalService: AnimalService
    ) {}

    useBackendImages: string = `${environment.useBackendImages}`

    animalForm!: FormGroup

    updated: boolean = false

    ngOnInit(): void {
        this.initForm()
    }        

  ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      this.animalForm = new FormGroup({
          firstname: new FormControl(this.animal.firstname, Validators.required),
          health: new FormControl(this.animal.health, Validators.required),
      });    
      if (!this.updatable) {
          this.firstname.disable()
          this.health.disable()
      }
      this.animalForm.valueChanges.subscribe(change => {
          this.updated = this.isUpdated()
      })        
  }

    initForm = () => {

    }
    create = () => {

        this.animal.firstname = this.firstname.value
        this.animal.health = this.health.value

        this.animalService.postAnimal(this.animal).subscribe({
            next: (res: Animal) => {
                // this.updateanimalList.emit(0)
                console.log(res)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })

    }

    isUpdated = () => {
        return this.animal.firstname !== this.firstname.value ||
            this.animal.health !== this.health.value
    }

    get firstname() { return this.animalForm.get('firstname')! as FormControl }
    get health() { return this.animalForm.get('health')! as FormControl }

}
