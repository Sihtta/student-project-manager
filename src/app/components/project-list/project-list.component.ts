import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { PriorityColorDirective } from '../../directives/priority-color.directive';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterLink, PriorityColorDirective],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
  }

  get todoProjects(): Project[] {
    return this.projects.filter(project => project.status === 'À faire');
  }

  get inProgressProjects(): Project[] {
    return this.projects.filter(project => project.status === 'En cours');
  }

  get doneProjects(): Project[] {
    return this.projects.filter(project => project.status === 'Terminé');
  }

}