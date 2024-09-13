import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl; // Use the base URL from the environment file
  private basePythonUrl: string = environment.pyApiUrl;

  constructor(private http: HttpClient) {}

  // Generic GET request with optional query parameters
  get<T>(endpoint: string, params?: any): Observable<T> {
    console.log("checking base url", this.baseUrl);
    const url = `${this.baseUrl}${endpoint}`;
    let httpParams = new HttpParams();

    // If query parameters are provided, convert them into HttpParams
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http.get<T>(url, { params: httpParams });
  }

  // Generic POST request
  post<T>(endpoint: string, body: any, usePy: boolean = false): Observable<T> {
    let url =  `${this.baseUrl}${endpoint}`;
    if (usePy){
      url = `${this.basePythonUrl}${endpoint}`
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<T>(url, body, { headers });
  }

  // Generic PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }
}
