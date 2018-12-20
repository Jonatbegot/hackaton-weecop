import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Event } from '../event';


@Component({
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent implements OnInit {

  form = this.fb.group({
    name : ['', Validators.required],
    email: ['', Validators.required],
    title: ['', Validators.required],
    company: [''],
    start: [Date, Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required]
  });

  event: Event;

  constructor(
    public dialogRef: MatDialogRef<FormRendezVousComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder ) {}


  ngOnInit() {
  }

  submit(): void {
    this.createEvent();

    this.dialogRef.close(this.event);
  }

  createEvent() {
    const start = this.form.get('start').value
      + ' ' + this.form.get('startTime').value + ':00:0';
    const end = this.form.get('start').value
      + ' ' + this.form.get('endTime').value + ':00:0';

    this.event = new Event(
      this.form.get('name').value,
      this.form.get('email').value,
      this.form.get('title').value,
      this.form.get('company').value,
      start,
      end
    );
  }
}


