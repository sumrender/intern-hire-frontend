import { Routes } from '@angular/router';
import { JobComponent } from './pages/job/job.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { CreateJobComponent } from './pages/create-job/create-job.component';
import { JobPostListComponent } from './pages/job-posts-list/job-posts-list.component';
import { CandidateProfileComponent } from './pages/candidate-profile/candidate-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'job/:jobId', component: JobComponent },
  { path: 'candidates', component: CandidatesComponent },
  { path: 'job-posts', component: JobPostListComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'candidates/:id', component: CandidateProfileComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
