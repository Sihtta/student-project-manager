import { Component } from '@angular/core';

import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent],
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

  moveToInProgress(project: Project): void {
    this.projectService.updateProjectStatus(project.id, 'En cours');
  }

  moveToDone(project: Project): void {
    this.projectService.updateProjectStatus(project.id, 'Terminé');
  }

  moveToTodo(project: Project): void {
    this.projectService.updateProjectStatus(project.id, 'À faire');
  }

  deleteProject(id: number): void {
    if (confirm('Supprimer ce projet ?')) {
      this.projectService.deleteProject(id);
      this.projects = this.projectService.getProjects();
    }
  }
}
