import { FormRendezVousComponent } from '../form-rendez-vous/form-rendez-vous.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { CalendarService } from '../common/calendar.service';

import * as moment from 'moment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { toEventShort } from '../common/eventShort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  events: any;
  newEvent: any;
  calendarId: string;
  constructor(
    private dialog: MatDialog,
    private service: CalendarService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) { }

  title = 'Outil de prise de rendez-vous';
  calendarOptions: Options;

  ngOnInit() {
    this.calendarId = this.route.snapshot.params.id;
    this.service.getEvents(this.calendarId).subscribe(res => {
      this.events = res;
      console.log(this.events);
    });
    this.calendarOptions = {
      defaultView: 'agendaWeek',
      locale: 'fr',
      allDaySlot: false,
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth',
      },
      slotDuration: moment.duration('0:30:00'),
      weekends: false,
      minTime: moment.duration('08:00:00'),
      maxTime: moment.duration('19:00:00'),
      contentHeight: 500,
      timezone: 'Europe/Paris',
      eventColor: '#ba8fa8',
      displayEventTime: false,
      selectable: true,
      selectConstraint: {
        start: moment().subtract(1, 'days'),
        end: moment().startOf('year').add(100, 'year')
      },
    };
  }

  addEvent(e) {
    const current = new Date(moment().format());
    const selected = e.date ? e.date._d : null;
    if (selected && selected.getTime() < current.getTime()) {
      // const snackBarRef = this.snackBar.open('Créneau horaire déjà passé');
      this.snackBar.open('Créneau horaire déjà passé', '', {
        duration: 2000
      });
      return console.log('Créneau horaire déjà passé');
    }
    const dialogRef = this.dialog.open(FormRendezVousComponent, {
      height: '500px',
      width: '800px',
      data: e
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.confirmEvent(data);

      }
    });
  }


  confirmEvent(data) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.postEvent(result, this.calendarId).subscribe(res => {
          res.title = 'réservé';
          this.ucCalendar.fullCalendar('renderEvent', res);
        });

      } else {
        this.addEvent(data);

      }
    });
  }
}
