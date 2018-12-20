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
    endTime: ['', Validators.required]
  });

  event: Event;
  date: any;

  constructor(
    public dialogRef: MatDialogRef<FormRendezVousComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder ) {
      this.date = data.date._d;
    }


  ngOnInit() {
  }

  submit(): void {
    this.createEvent();
    console.log(this.event);
    this.dialogRef.close(this.event);
  }

  createEvent() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const time = this.form.get('endTime').value;
    const start = this.date;
    const end = new Date(2018, 12, 21, time.substr(0, 2), time.substr(3, 5)).toISOString();
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


