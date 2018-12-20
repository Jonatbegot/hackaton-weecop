import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { MatDialogModule, MatInputModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule
  ],
  entryComponents: [FormRendezVousComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
