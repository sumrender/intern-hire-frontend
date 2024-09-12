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

  getCandidates(offset?: number, limit?: number, sortField?: string, sortOrder?: number, globalFilter?: string): Observable<any> {
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
      params.filter = globalFilter;
    }
  
    return this.apiService.get<any>('candidates', params);
  }

  getCandidateById(id: string): Observable<any> {
    return of(candidates[0]);
  }
}
