import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog } from './idog';
import 'rxjs/add/operator/map'



@Injectable({
  providedIn: 'root'
})
export class DogService {


  constructor(private http: HttpClient) { }


  get(page): Observable<Dog[]> {
    return this.http.get<Dog[]>(`https://api.thedogapi.com//v1/images/search?limit=100&page=${page}`)
    .map((element)=> {
      return element.map(dog => new Dog(dog))
    })
  }
}
