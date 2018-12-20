export class GoogleEvent {
  constructor(
    public summary: string,
    public description: string,
    public start: Time,
    public end: Time,
    public attendees: Attendees[],
    public id?: string
   ) { }
}
export class Time {
  constructor(
    public dateTime: string) {
  }

}

export class Attendees {
  constructor(
    public displayName: string,
    public email: string,
  ) {}
}


export function toGoogleEvent(event): GoogleEvent {
  const attendees = [new Attendees(event.name, event.email)];
  const start =  new Time(event.start);
  const end = new Time(event.end);


  return new GoogleEvent(
    event.summary,
    event.description,
    start,
    end,
    attendees,
    event.id
);
}
