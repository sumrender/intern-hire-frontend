import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobComponent } from './job/job.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs/:jobId', component: JobComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }
];
