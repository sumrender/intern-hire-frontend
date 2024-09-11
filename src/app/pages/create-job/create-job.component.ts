import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss'
})
export class CreateJobComponent {
  jobForm: FormGroup;
  jobDomains: string[] = ['Frontend', 'Backend'];

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDesc: ['', Validators.required],
      jobDomain: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
      console.log('Job Data:', jobData);
    } else {
      console.log('Form is invalid');
    }
  }
}
