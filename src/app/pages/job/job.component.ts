import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FileUploadModule, FileBeforeUploadEvent, UploadEvent } from 'primeng/fileupload';
import { environment } from '../../../environment';
import { CandidateListComponent } from '../../components/candidate-list/candidate-list.component';
import { DialogModule } from 'primeng/dialog';
import { JobPostService } from '../../services/job-post.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [FileUploadModule, CardModule, CandidateListComponent, DialogModule, CommonModule],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'] // Fixed typo from styleUrl to styleUrls
})
export class JobComponent implements OnInit {
  jobId: string = '';
  uploadUrl = environment.uploadExcelUrl;
  showJobDetails: boolean = false;

  job: any;

  constructor(private jobPostService: JobPostService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get jobId from route parameters
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('jobId') || ''; // Extract jobId from the URL
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
}
