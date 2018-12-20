export class EventShort {
  constructor(
    public title: string,
    public start: string,
    public end: string,
    public id?: string) { }
}

export function toEventShort(event): EventShort {
  return new EventShort(
    'réservé',
    event.start ? event.start.dateTime : null,
    event.end ? event.end.dateTime : null,
    event.id
  );
}
