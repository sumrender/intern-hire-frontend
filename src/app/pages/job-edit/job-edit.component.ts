import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from '../../services/job-post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  jobForm!: FormGroup;
  jobId: string = '';
  isLoading: boolean = true;
  job: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobPostService: JobPostService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('jobId') || '';
    if (this.jobId) {
      this.loadJobDetails();
    }

    this.jobForm = this.fb.group({
      job_title: ['', Validators.required],
      job_domain: ['', Validators.required],
      job_desc: ['', Validators.required],
      code_coverage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      code_review_score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      resume_score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      is_active: [false]
    });
  }

  loadJobDetails() {
    this.jobPostService.getJobById(this.jobId).subscribe((res) => {
      this.job = res.data[0];
      this.jobForm.patchValue({
        job_title: this.job.job_title,
        job_domain: this.job.job_domain,
        job_desc: this.job.job_desc,
        code_coverage: this.job.code_coverage,
        code_review_score: this.job.code_review_score,
        resume_score: this.job.resume_score,
        is_active: this.job.is_active
      });
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.jobPostService.updateJob(this.jobId, this.jobForm.value).subscribe(
        (response) => {
          console.log('Job updated successfully', response);
          this.router.navigate(['/job-posts']);
        },
        (error) => {
          console.error('Failed to update job', error);
        }
      );
    }
  }
}
