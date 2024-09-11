import { Routes } from '@angular/router';
import { JobComponent } from './pages/job/job.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { CreateJobComponent } from './pages/create-job/create-job.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { CandidateProfileComponent } from './pages/candidate-profile/candidate-profile.component';

export const routes: Routes = [
  { path: 'jobs/:jobId', component: JobComponent },
  { path: 'candidates', component: CandidateListComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'candidates/:id', component: CandidateProfileComponent },
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
