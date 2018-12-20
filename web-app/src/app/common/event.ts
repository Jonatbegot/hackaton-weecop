export class Event {
    constructor (
      public name: string,
      public email: string,
      public title: string,
      public company: string,
      public start: string,
      public end: string,
      public id?: string) {}
}

export function toEvent(event): Event {
  function getAttendees() {
    const attendees = [];
    let email = '';
    let name = '';
    if (event.attendees && event.attendees.length > 0) {
      for (const a of event.attendees) {
        name = a.displayName;
        email = a.email;
        attendees.push({name: name, email: email});
      }
    }
    return attendees;
  }

  return new Event (
    event.attendees ? getAttendees()[0].name : 'none',
    event.attendees ? getAttendees()[0].email : 'none',
    event.summary,
    event.description,
    event.start ? event.start.dateTime : null,
    event.end ? event.end.dateTime : null,
    event.id
  );
}
