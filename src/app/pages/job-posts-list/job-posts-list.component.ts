import { Component, OnInit } from '@angular/core';
import { JobPostService } from '../../services/job-post.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { JobPost } from '../../models/job-post.model';

@Component({
  selector: 'app-job-post-list',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './job-posts-list.component.html',
  styleUrls: ['./job-posts-list.component.scss']
})
export class JobPostListComponent implements OnInit {
  jobPosts: JobPost[] = [];

  constructor(private jobPostService: JobPostService) { }

  ngOnInit(): void {
    this.fetchJobPosts();
  }

  fetchJobPosts() {
    this.jobPostService.getAllJobPosts().subscribe(
      (data) => {
        this.jobPosts = data;
      },
      (error) => {
        console.error('Error fetching job posts:', error);
      }
    );
  }

  toggleJobStatus(job: JobPost) {
    console.log("chekcint hte job", job);
    const updatedStatus = !job.is_active;
    this.jobPostService.updateJobStatus(job.jobId, updatedStatus).subscribe(
      (response) => {
        job.is_active = updatedStatus;
      },
      (error) => {
        console.error('Error updating job status:', error);
      }
    );
  }
}
