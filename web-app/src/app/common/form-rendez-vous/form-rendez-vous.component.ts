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
    company: ['']
  });

  event: Event;
  startDate: any;
  endDate: any;

  constructor(
    public dialogRef: MatDialogRef<FormRendezVousComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder ) {
      // if creation
      if (data.date) {
        this.startDate = this.getStartDate(data);
        this.endDate = this.getEndDate(data);
      }
      // if update
      if (data.name) {
        this.startDate = data.start;
        this.endDate = data.end;
        this.form.patchValue({
          name: data.name,
          email: data.email,
          title: data.title,
          company: data.company,
          endTime: `${data.end._d.getHours()}:${data.end._d.getMinutes()}`
        });
      }
    }


  ngOnInit() {
  }

  submit(): void {
    this.createEvent();
    this.dialogRef.close(this.event);
  }

  createEvent() {
    const start = this.startDate;
    const end = this.endDate;

    this.event = new Event(
      this.form.get('name').value,
      this.form.get('email').value,
      this.form.get('title').value,
      this.form.get('company').value,
      start,
      end
    );
  }

  getStartDate(data) {
    return new Date(
      data.date._i[0], // year
      data.date._i[1], // month
      data.date._i[2], // day
      data.date._i[3], // hour
      data.date._i[4], // min
      data.date._i[5], // sec
      data.date._i[6] // millisec
    );
  }

  getEndDate(data) {
    return new Date(
      data.date._i[0], // year
      data.date._i[1], // month
      data.date._i[2], // day
      data.date._i[4] === 30 ? data.date._i[3] + 1 : data.date._i[3], // hour
      data.date._i[4] === 30 ? 0 : 30, // min
      data.date._i[5], // sec
      data.date._i[6] // millisec
    );
  }
}


