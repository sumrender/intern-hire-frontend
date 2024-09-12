import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Import ApiService
import { JobPost } from '../models/job-post.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  constructor(private apiService: ApiService) {}

  // Method to create a new job post
  createJobPost(jobPost: JobPost): Observable<any> {
    return this.apiService.post<any>('/job-post', jobPost);
  }

  // Method to fetch all job posts
  getAllJobPosts(): Observable<JobPost[]> {
    return this.apiService.get<JobPost[]>('/job-posts');
  }
}
