import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordSharedService {
  private sharedDict = new BehaviorSubject<{ [key: string]: any }>({ word: 'Alice', frequency: 25 }); // create a BehaviorSubject that holds the shared dictionary
  sharedDict$ = this.sharedDict.asObservable(); // create an observable that emits the latest value of the shared dictionary

  setSharedDict(value: { [key: string]: any }) {
    this.sharedDict.next(value); // update the shared dictionary with a new value
  }
}
