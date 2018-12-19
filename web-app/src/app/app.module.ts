import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FormRendezVousComponent } from './common/form-rendez-vous/form-rendez-vous.component';

@NgModule({
  declarations: [
    AppComponent,
    FormRendezVousComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    MatDialogModule

  ],
  entryComponents: [FormRendezVousComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
