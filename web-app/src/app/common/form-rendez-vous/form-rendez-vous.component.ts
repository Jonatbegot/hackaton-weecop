import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent implements OnInit {

  rendezVousForm = this.fb.group({
    name : ['', Validators.required],
    email: ['', Validators.required],
    title: ['', Validators.required],
    company: [''],
    start: [Date, Validators.required],
    end: [Date, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<FormRendezVousComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder ) {}


  ngOnInit() {
  }

  submit(): void {
    this.dialogRef.close(this.rendezVousForm);
  }

  }


