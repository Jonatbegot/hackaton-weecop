import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Event } from '../common/event';


@Component({
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  form = this.fb.group({
    name : ['', Validators.required],
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(this.emailPattern)])],
    title: ['', Validators.required],
    company: ['']
  });

  event: Event;
  startDate: any;
  endDate: any;

  constructor(
    public dialogRef: MatDialogRef<FormRendezVousComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder ) {
      // if creation of an event
      if (data.date) {
        this.startDate = this.getStartDate(data);
        this.endDate = this.getEndDate(data);
      }
      // if update of an event
      if (data.name) {
        this.startDate = data.start;
        this.endDate = data.end;
        this.form.patchValue({
          name: data.name,
          email: data.email,
          title: data.title,
          company: data.company
        });
      }
    }


  ngOnInit() {
  }

  // validate changes
  submit(): void {
    this.createEvent();
    this.dialogRef.close(this.event);
  }

  // create new Event object
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

  // get start date in the appropriate format
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

  // get start date in the appropriate format
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


