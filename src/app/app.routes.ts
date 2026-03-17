import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'projects', component: ProjectListComponent },

  { path: 'projects/:id', component: ProjectDetailComponent },

  { path: 'add-project', component: AddProjectComponent },

  { path: 'addProjects', redirectTo: 'add-project', pathMatch: 'full' },

  { path: 'stats', component: StatsComponent },

  { path: 'projects/edit/:id', component: AddProjectComponent },

  { path: '**', redirectTo: '' }
];
