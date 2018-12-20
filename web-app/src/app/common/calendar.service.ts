import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event, toEvent } from './event';
import { GoogleEvent, toGoogleEvent } from './eventGoogle';

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
  postEvent(data): Observable<any> {
    const newEvent = toGoogleEvent(data);
    console.log(newEvent);
    console.log(data);
    return this.http.post<Event>(`http://localhost:3000/calendar`, newEvent)
      .pipe(
        map(event => toEvent(event))
      );
  }
}
