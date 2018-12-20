import { FormRendezVousComponent } from './common/form-rendez-vous/form-rendez-vous.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

// import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { weekdays } from 'moment';
import { WeekDay } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
constructor( private dialog: MatDialog) {}
  title = 'my-angular-app';
  calendarOptions: Options;
  ngOnInit() {
  this.calendarOptions = {
        defaultView: 'agendaWeek' ,
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        }

      };
  }

modal() {
    // this.displayEvent = model;

    const dialogRef = this.dialog.open(FormRendezVousComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
