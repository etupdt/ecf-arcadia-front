import { IAnimal } from '../interfaces/IAnimal';
import { Animal } from '../models/Animal';
import { AnimalFilterPipe } from './animal-filter.pipe';

// Le mock des animals contient deux animaux (Jumbo et Gigi).
// Le pipe testé recoit les animals et les arguments : 
//    - la date à filtrer 
//    - un tableau des id des animaux à conserver
// le filtre renvoit le tableau des animaux filtré.

let pipe: AnimalFilterPipe
let result: IAnimal[]

let mockJumbo: IAnimal = Animal.deserialize({
    "id": 2,
    "firstname": "Jumbo",
    "health": "Bon état de santé",
    "description": "Animal imposant de la savane",
    "breed": {
        "id": 5,
        "label": "Eléphant"
    },
    "habitat": {
        "id": 1,
        "name": "Savane",
        "description": "Animaux de la savane",
        "comment": "",
        "images": [
            {
                "id": 2,
                "imageName": "habitat_20b648b11d33ea33108e8f93f64436d1.webp",
                "hash": ""
            }
        ]
    },
    "images": [
        {
            "id": 6,
            "imageName": "animal_d47620b2181d04dddc29cb763188c461.webp",
            "hash": ""
        }
    ],
    "foodAnimals": [],
    "veterinaryReports": [
        {
            "id": 3,
            "date": "2024-09-27",
            "detail": "Bon état de santé, maintient du régime",
            "gramage": 5500,
            "user": {
                "id": 2,
                "firstname": "Alfred",
                "lastname": "Levetaux",
                "email": "veto@test.com",
                "password": "$2a$10$hTc/.Qpwe0I/hSwwmBXX1eQvHI8aqvGlxJ7VKXE5SKkkrYLibsYwa",
                "role": "VETERINARY"
            },
            "food": {
                "id": 1,
                "name": "Foin"
            }
        },
        {
            "id": 1,
            "date": "2024-09-27",
            "detail": "Anémie, augmentation du régime",
            "gramage": 5000,
            "user": {
                "id": 2,
                "firstname": "Alfred",
                "lastname": "Levetaux",
                "email": "veto@test.com",
                "password": "$2a$10$hTc/.Qpwe0I/hSwwmBXX1eQvHI8aqvGlxJ7VKXE5SKkkrYLibsYwa",
                "role": "VETERINARY"
            },
            "food": {
                "id": 1,
                "name": "Foin"
            }
        }
    ]
}, 1)

let mockGigi: IAnimal = Animal.deserialize({
    "id": 4,
    "firstname": "Gigi",
    "health": "Bon état de santé",
    "description": "Animal trés haut de la savane",
    "breed": {
        "id": 2,
        "label": "Girafe"
    },
    "habitat": {
        "id": 1,
        "name": "Savane",
        "description": "Animaux de la savane",
        "comment": "",
        "images": [
            {
                "id": 2,
                "imageName": "habitat_20b648b11d33ea33108e8f93f64436d1.webp",
                "hash": ""
            }
        ]
    },
    "images": [
        {
            "id": 7,
            "imageName": "animal_7f361047fa5a1fee56c04265c3faf271.webp",
            "hash": ""
        },
        {
            "id": 8,
            "imageName": "animal_3d3b412698d15066d7b5e7933bcf2467.webp",
            "hash": ""
        }
    ],
    "foodAnimals": [],
    "veterinaryReports": []
}, 1)

describe('AnimalFilterPipe', () => {
    beforeEach(() => {
        const pipe = new AnimalFilterPipe()
        // expect(pipe).toBeTruthy()
        result = pipe.transform([mockJumbo, mockGigi], "2024-09-27", [
            {
                "id": 2,
                "item_text": "Jumbo"
            }
        ]
    );
    });
    it ('Doit contenir un seul animal', () => {
        expect(result.length).toEqual(1);
    })

    it ('Doit contenir l\'animal Jumbo', () => {
        expect(result[0].firstname).toEqual('Jumbo');
    })
})

