import { NgIf } from '@angular/common';
import { Component, Injector, ViewChild, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, ImageCropperModule } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { ImageCropComponent } from "../image-crop/image-crop.component";
import { Image } from 'src/app/models/Image';
import { Habitat } from 'src/app/models/Habitat';
import { CarouselComponent } from '../carousel/carousel.component';
import { IHabitat } from 'src/app/interfaces/IHabitat';

@Component({
    selector: 'app-habitat-form',
    templateUrl: './habitat-form.component.html',
    styleUrls: ['./habitat-form.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, ImageCropperModule, ImageCropComponent, CarouselComponent]
})
export class HabitatFormComponent {

    useBackendImages: string = `${environment.useBackendImages}`
                
    habitatForm!: FormGroup

    imagesUpdated: boolean = false

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const IsUpdatedItem = this.itemsService.signalIsUpdatedItem()
            // const selectedIndex = this.itemsService.signalSelectedIndex()
            if (this.itemsService.selectedIndex === -1) {
                this.habitat = new Habitat()
            } else {
                this.habitat = Habitat.deserialize(this.items[this.itemsService.selectedIndex], 1)
            }
            this.initForm()
        })
    }    

    get items() {return this.itemsService.items}

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: Habitat) {this.itemsService.items[this.itemsService.selectedIndex]}

    get habitat() { return this.itemsService.updatedItem }
    set habitat(habitat : IHabitat) { this.itemsService.updatedItem = habitat }

    get name() { return this.habitatForm.get('name')! as FormControl }
    get description() { return this.habitatForm.get('description')! as FormControl }
    get comment() { return this.habitatForm.get('comment')! as FormControl }

    ngOnInit(): void {

        this.habitat = new Habitat ()
        
        this.itemsService.signalIsUpdated.set(false)

        this.initForm()
    
    }        

    initForm = () => {
        this.habitatForm = new FormGroup({
            name: new FormControl(this.habitat.name, Validators.required),
            description: new FormControl(this.habitat.description, Validators.required),
            comment: new FormControl(this.habitat.comment, Validators.required),
        });    
        this.habitatForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.habitat.name !== this.name.value ||
                this.habitat.description !== this.description.value ||
                this.habitat.comment !== this.comment.value ||
                this.imagesUpdated
            )
            this.itemsService.signalIsValid.set(this.habitatForm.valid)
            this.habitat.name = this.name.value
            this.habitat.description = this.description.value
            this.habitat.comment = this.comment.value
        })
    }

    onDeleteImage = (index: number) => {
        this.habitat.images.splice(index,1)
        this.imagesUpdated = true
        this.itemsService.signalIsUpdated.set(true)
        this.itemsService.signalIsValid.set(this.habitatForm.valid && this.habitat.images.length > 0)
    }

    onAddImage = (image: Image) => {
        this.habitat.images.push(image)
        this.imagesUpdated = true
        this.itemsService.signalIsUpdated.set(true)
        this.itemsService.signalIsValid.set(this.habitatForm.valid && this.habitat.images.length > 0)
    }    

}
