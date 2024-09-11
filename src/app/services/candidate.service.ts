import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { candidates } from '../mock-data/candidates.data';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = '/api/candidates';  // Mock API URL

  constructor(private http: HttpClient) {}

  getCandidates(first: number, rows: number, sortField: string, sortOrder: number, globalFilter: string): Observable<any> {
    const params = {
      first: first?.toString(),
      rows: rows?.toString(),
      sortField: sortField || '',
      sortOrder: sortOrder?.toString(),
      filter: globalFilter || ''
    };

    // return this.http.get<any>(this.apiUrl, { params });
    return of({
      count: 2,
      data: candidates});
  }

  getCandidateById(id: string): Observable<any> {
    return of(candidates[0]);
  }
}
