import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event, toEvent } from './event';
import { toGoogleEvent } from './eventGoogle';
import { toEventShort } from './eventShort';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getEvents(calId): Observable<any> {
    return this.http.get<Event[]>(`http://localhost:3000/calendar/events/${calId}`)
      .pipe(
        map(events => events.map(event => toEventShort(event)))
      );
  }


  postEvent(data, calId): Observable<any> {
    const newEvent = toGoogleEvent(data);
    return this.http.post<Event>(`http://localhost:3000/calendar/${calId}`, newEvent)
      .pipe(
        map(event => toEvent(event))
      );
  }
}
