import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobComponent } from './pages/job/job.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs/:jobId', component: JobComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'candidates', component: CandidateListComponent},
  { path: '**', component: PageNotFoundComponent }
];
