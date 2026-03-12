import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  projects: Project[] = [];

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
  }

  get totalProjects() {
    return this.projects.length;
  }

  get completedProjects() {
    return this.projects.filter(p => p.status === 'Terminé').length;
  }

  get urgentProjects() {
    return this.projects.filter(p => p.priority === 'Haute').length;
  }

}