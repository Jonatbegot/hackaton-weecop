import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event, toEvent } from './event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get<Event[]>(`http://localhost:3000/calendar/events`)
    .pipe(
      map(events => events.map(event => toEvent(event)))
    );
  }
// postEvents(): Observable<any> {

// }
}
