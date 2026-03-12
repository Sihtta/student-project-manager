import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AddProjectComponent } from './components/add-project/add-project.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'projects', component: ProjectListComponent },

  { path: 'projects/:id', component: ProjectDetailComponent },

  { path: 'addProjects', component: AddProjectComponent }

];