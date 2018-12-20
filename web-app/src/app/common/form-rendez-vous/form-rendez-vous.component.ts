import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  styleUrls: ['./form-rendez-vous.component.css']
})
export class FormRendezVousComponent implements OnInit {

  RendezVousForm = this.fb.group({
    firstName : [''],
    lastName: [''],
    sujet: [''],
    societe: [''],
    debut: [Date],
    fin: [Date]
  });

  constructor(
    public dialogRef: MatDialogRef<FormRendezVousComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder ) {}


  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  }


