export interface IDog {
    id: string;
        url: string;
        width?: any;
        height?: any;
        mime_type: string;
        entities: any[];
        breeds: Breed[];
        animals: any[];
        categories: any[];
}

export interface Breed {
    id: number;
    name: string;
    wikipedia_url: string;
}

export class Dog implements IDog{
    id: string;
    url: string;
    width?: any;
    height?: any;
    mime_type: string;
    entities: any[];
    breeds: Breed[];
    animals: any[];
    categories: any[];

    constructor(data){
        this.id = data.id;
        this.animals = data.animals;
        this.breeds = data.breeds;
        this.categories = data.categories;
        this.entities = data.entities;
        this.height = data.height;
        this.mime_type = data.mime_type;
        this.url = data.url;
        this.width = data.width;
    }

}


