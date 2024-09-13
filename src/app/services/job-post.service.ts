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

  updateJobStatus(jobId: string, is_active: boolean): Observable<any> {
    console.log("chekcingte hte ", jobId);
    return this.apiService.put(`/job-post/${jobId}`, { is_active });
  }

  updateJob(job_id: string, updatedFields: { [key: string]: any }): Observable<any> {
    return this.apiService.put(`/job-post/${job_id}`, updatedFields);
  }

  getAllJobPosts(offset: number = 0, limit: number = 10): Observable<{ count: number, data: JobPost[] }> {
    return this.apiService.get<{ count: number, data: JobPost[] }>('/job-posts', { offset: offset.toString(), limit: limit.toString() });
  }
  
  getJobById(job_id: string): Observable<{count: number, data: JobPost[]}> {
    return this.apiService.get<{count: number, data: JobPost[]}>('/job-posts', { job_id });
  }
}
