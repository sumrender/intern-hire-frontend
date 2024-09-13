import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { candidates } from '../mock-data/candidates.data';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getCandidates(offset?: number, limit?: number, sortField?: string, sortOrder?: number, globalFilter?: string, jobId?: string): Observable<any> {
    const params: any = {};
  
    if (offset !== undefined && offset !== null) {
      params.offset = offset.toString();
    }
    if (limit !== undefined && limit !== null) {
      params.limit = limit.toString();
    }
    if (sortField) {
      params.sortField = sortField;
    }
    if (sortOrder !== undefined && sortOrder !== null) {
      params.sortOrder = sortOrder.toString();
    }
    if (globalFilter) {
      params.search = globalFilter;
    }

    if(jobId){
      params.current_job_id = jobId;
    }
  
    return this.apiService.get<any>('/candidates', params);
  }


  getCandidateStats(): Observable<any> {
    return this.apiService.get<any>('/candidate-stats');
  }

  getCandidateById(id: string): Observable<any> {
    return of(candidates[0]);
  }

  getCandidatesByJobId(jobId: string): Observable<any> {
    return this.apiService.get(`/candidates?job_id=${jobId}`);
  }
}
