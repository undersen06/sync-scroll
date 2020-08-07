import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DogService } from './dog/dog.service';
import { Dog } from './dog/idog';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, debounce, throttleTime, map, delay, filter, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('input') input: ElementRef;


  title = 'sync-scroll';
  quadrants: Array<Dog[]>;
  subscriptionDebounce: Subscription;
  subscriptionThrottle: Subscription;
  subscriptionDelay: Subscription;
  subscriptionRegular:Subscription;

  constructor(private dogservice: DogService) {


  }

  ngOnInit(): void {
    this.dogservice.get(1).subscribe((data) => {
      this.quadrants = this.chunk(data, 25);

      // this.subscribeScrollEventsRegular()

      setTimeout(() => {
        this.subscribeScrollEventsTrottle();
        this.subscribeScrollEventsDebounce();
        this.subscribeScrollEventsDelay();  
        this.subscribeScrollEventsRegular();  
      }, 200);
      


    });
  }

  ngAfterViewInit() {

  }

  subscribeScrollEventsRegular() {

    let columns = document.getElementsByClassName('regular');

    for (const column of Array.from(columns)) {

      const subs = fromEvent(column, 'scroll').pipe(
        map((data) => {
          return data;
        }),
      )

      this.subscriptionRegular = subs.subscribe(
        (x: any) => {
          for (const column of Array.from(columns)) {
            column.scrollLeft = x.srcElement.scrollLeft;
            column.scrollTop = x.srcElement.scrollTop;
          }
        }
      );
    }
  }

  subscribeScrollEventsDelay() {

    let columns = document.getElementsByClassName('delay');

    for (const column of Array.from(columns)) {

      const subs = fromEvent(column, 'scroll').pipe(
        delay(1000),
        map((data) => {
          return data;
        }),
      )

      this.subscriptionDelay = subs.subscribe(
        (x: any) => {
          for (const column of Array.from(columns)) {
            column.scrollLeft = x.srcElement.scrollLeft;
            column.scrollTop = x.srcElement.scrollTop;
          }
        }
      );
    }
  }

  subscribeScrollEventsDebounce() {

    let columns = document.getElementsByClassName('debounce');

    for (const column of Array.from(columns)) {

      const subs = fromEvent(column, 'scroll').pipe(
        debounceTime(1000),
        map((data) => {
          return data;
        }),
      )

      this.subscriptionDelay = subs.subscribe(
        (x: any) => {
          for (const column of Array.from(columns)) {
            column.scrollLeft = x.srcElement.scrollLeft;
            column.scrollTop = x.srcElement.scrollTop;
          }
        }
      );
    }
  }

  subscribeScrollEventsTrottle() {

    let columns = document.getElementsByClassName('throttle');

    for (const column of Array.from(columns)) {

      const subs = fromEvent(column, 'scroll').pipe(
        throttleTime(1000),
        map((data) => {
          return data;
        }),
      )

      this.subscriptionThrottle = subs.subscribe(
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
