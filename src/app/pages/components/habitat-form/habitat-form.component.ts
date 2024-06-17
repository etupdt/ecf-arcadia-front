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

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const selectedIndex = this.itemsService.signalSelectedIndex()
            this.initItem(this.itemsService.selectedIndex)
        })
        effect(() => {
            const nonValue = this.itemsService.signalIsUpdatedItem()
            this.initItem(this.itemsService.selectedIndex)
        })
    }    

    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent | undefined;

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: Habitat) {this.itemsService.items[this.itemsService.selectedIndex]}

    get habitat() { return this.itemsService.updatedItem }
    set habitat(habitat : Habitat) { 
        this.itemsService.updatedItem = habitat 
    }

    get name() { return this.habitatForm.get('name')! as FormControl }
    get description() { return this.habitatForm.get('description')! as FormControl }
    get comment() { return this.habitatForm.get('comment')! as FormControl }

    ngOnInit(): void {

        this.habitat = new Habitat (0, '', '', '', [], [])
        
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
                this.habitat.comment !== this.comment.value
            )
            this.itemsService.signalIsValid.set(this.habitatForm.valid)
            this.habitat.name = this.name.value
            this.habitat.description = this.description.value
            this.habitat.comment = this.comment.value
        })
    }

    initItem = (selectedIndex: number) => {
        if (selectedIndex === -1) {
            this.habitat = new Habitat (0, '', '', '', [], [])
        } else {
            this.habitat = new Habitat (
                this.selectedItem.id,
                this.selectedItem.name,
                this.selectedItem.description,
                this.selectedItem.comment,
                [],
                this.selectedItem.images
            )
        }
        this.initForm()
    }

    onDeleteImage = (index: number) => {
        this.habitat.images.splice(index,1)
    }

    onAddImage = (image: Image) => {
        this.habitat.images.push(image)
    }    

}
