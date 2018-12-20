import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [FormRendezVousComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
