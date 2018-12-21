import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from 'ng-fullcalendar';
import { MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

import { AppComponent } from './app.component';
import { FormRendezVousComponent } from './common/form-rendez-vous/form-rendez-vous.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FormRendezVousComponent,
    ConfirmDialogComponent
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
    MatInputModule,
    MatCardModule,
    OverlayModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule
  ],
  exports: [ConfirmDialogComponent],
  entryComponents: [FormRendezVousComponent, ConfirmDialogComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
