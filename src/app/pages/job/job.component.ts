import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FileUploadModule, FileBeforeUploadEvent, UploadEvent } from 'primeng/fileupload';
import { environment } from '../../../environment.prod';
import { CandidateListComponent } from '../../components/candidate-list/candidate-list.component';
import { DialogModule } from 'primeng/dialog';
import { JobPostService } from '../../services/job-post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [FileUploadModule, CardModule, CandidateListComponent, DialogModule, CommonModule],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'] // Fixed typo from styleUrl to styleUrls
})
export class JobComponent implements OnInit {
  jobId: string = '';
  uploadUrl = environment.apiUrl + '/upload-excel';
  showJobDetails: boolean = false;

  job: any;

  constructor(private jobPostService: JobPostService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('jobId') || '';
      console.log('chekcint eh job id', this.jobId);
      if (this.jobId) {
        this.loadJobDetails();
      }
    });
  }

  loadJobDetails() {
    this.jobPostService.getJobById(this.jobId).subscribe((res) => {
      this.job = res.data[0];
      console.log("chewitne s", this.job);
    });
  }

  // File upload methods
  onBeforeSend(event: FileBeforeUploadEvent) {
    event.formData.append('jobId', this.jobId);
  }

  onUpload(event: UploadEvent) {
    console.log('File uploaded successfully:', event);
  }

  openJobModal() {
    this.showJobDetails = true;
  }

  editJob() {
    this.router.navigate(['/edit-job', this.job.job_id]);  // Redirect to edit job page with job_id as a route parameter
  }
}
