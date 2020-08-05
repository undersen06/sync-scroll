import { Component, OnInit } from '@angular/core';
import { DogService } from './dog/dog.service';
import { Dog } from './dog/idog';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, debounce, throttleTime, map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sync-scroll';
  quadrants: Array<Dog[]>;
  // colums: HTMLCollectionOf<Element>;


  constructor(private dogservice: DogService) {

    
  }

  ngOnInit(): void {
    this.dogservice.get(1).subscribe((data) => {
      this.quadrants = this.chunk(data, 25);
      setTimeout(() => {
        this.subscribeScrollEvents()  
      }, 100);
      
    });
  }


  subscribeScrollEvents() {

    let columns = document.getElementsByClassName('flex-column');

    for (const column of Array.from(columns)) {

      fromEvent(column, 'scroll').pipe(
        throttleTime(10),
        map((data) => {
          return data;
        }),
      ).subscribe(
        (x: any) => {
          for (const column of Array.from(columns)) {
            column.scrollLeft = x.srcElement.scrollLeft;
            column.scrollTop = x.srcElement.scrollTop;
          }
        }
      );
    }
  }




  chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
  }
}
