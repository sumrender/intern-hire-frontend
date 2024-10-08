import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getCandidates(offset?: number, limit?: number, sortField?: string, sortOrder?: number, globalFilter?: string, jobId?: string, status?: string): Observable<{ data: Candidate[], count: number }> {
    const params: any = {};

    if (offset !== undefined) params.offset = offset.toString();
    if (limit !== undefined) params.limit = limit.toString();
    if (sortField) params.sortField = sortField;
    if (sortOrder !== undefined) params.sortOrder = sortOrder.toString();
    if (globalFilter) params.search = globalFilter;
    if (jobId) params.current_job_id = jobId;
    if(status) params.current_status = status.toLowerCase();
  
    return this.apiService.get<{ data: Candidate[], count: number }>('/candidates', params);
  }


  getCandidateStats(): Observable<any> {
    return this.apiService.get<any>('/candidate-stats');
  }

  getCandidateById(id: string): Observable<{ data: Candidate[], count: number }> {
    const params = {
      candidate_id: id,
    }
    return this.apiService.get<{ data: Candidate[], count: number }>('/candidates', params);
  }

  getCandidatesByJobId(jobId: string): Observable<any> {
    return this.apiService.get(`/candidates?job_id=${jobId}`);
  }

  sendEmailsBulk(mailList: any[]) {
    const params = {
        data: {
          mail_list: mailList
        }
    };
    return this.apiService.post('/send_email/bulk', params, true);
  }

  updateCandidate(candidate_id: string, updatedFields: { [key: string]: any }): Observable<any> {
    return this.apiService.put(`/candidates/${candidate_id}`, updatedFields);
  }

  reviewCandidateBulk(job_id: string) {
    return this.apiService.post(`/candidate-review/bulk/${job_id}`, {}, true);
  }
}
