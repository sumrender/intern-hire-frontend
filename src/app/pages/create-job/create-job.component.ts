import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { JobPostService } from '../../services/job-post.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    NgIf,
  ],
  providers: [MessageService],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss',
})
export class CreateJobComponent {
  jobForm: FormGroup;
  jobDomains: string[] = ['Frontend', 'Backend'];
  isLoading: boolean = false;
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private jobPostService: JobPostService,
    private router: Router,
    private messageService: MessageService // Inject MessageService for showing notifications
  ) {
    this.jobForm = this.fb.group({
      jobTitle: ['', Validators.required],
      jobDesc: ['', Validators.required],
      jobDomain: ['', Validators.required],
      baseUrl: ['', Validators.required],
      codeCoverage: ['', [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(100)]],
      resumeScore: ['', [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(10)]],
      codeReviewScore: ['', [Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(10)]],
      is_active: [true],
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.isLoading = true; // Set loading to true
      const jobData = this.jobForm.value;
      
      this.jobPostService.createJobPost(jobData).subscribe(
        (response) => {
          this.isLoading = false;
          this.isSuccess = true; // Mark success as true
          
          // Show success message
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Job post created successfully!'});
          
          // Redirect to /job-posts after 2 seconds delay
          setTimeout(() => {
            this.router.navigate(['/job-posts']);
          }, 2000);
        },
        (error) => {
          this.isLoading = false;
          console.error('Error creating job post:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
