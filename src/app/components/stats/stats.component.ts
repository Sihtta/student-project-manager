import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { UrgentProjectPipe } from '../../pipes/urgent-project.pipe';
import { PriorityColorDirective } from '../../directives/priority-color.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, UrgentProjectPipe, PriorityColorDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  projects: Project[] = [];

  totalProjects: number = 0;
  todoProjects: number = 0;
  inProgressProjects: number = 0;
  doneProjects: number = 0;
  urgentProjectsCount: number = 0;
  completionRate: number = 0;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // Recupere les projets avant de calculer les indicateurs.
    this.projects = this.projectService.getProjects();
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalProjects = this.projects.length;

    this.todoProjects = this.projects.filter(
      project => project.status === 'À faire'
    ).length;

    this.inProgressProjects = this.projects.filter(
      project => project.status === 'En cours'
    ).length;

    this.doneProjects = this.projects.filter(
      project => project.status === 'Terminé'
    ).length;

    // Compte les projets proches de l'echeance et non termines.
    this.urgentProjectsCount = this.projects.filter(project => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const deadline = new Date(project.deadline);
      deadline.setHours(0, 0, 0, 0);

      const diffTime = deadline.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      return diffDays >= 0 && diffDays <= 7 && project.status !== 'Terminé';
    }).length;

    // Calcule un pourcentage global d'avancement.
    if (this.totalProjects > 0) {
      this.completionRate = Math.round(
        (this.doneProjects / this.totalProjects) * 100
      );
    } else {
      this.completionRate = 0;
    }
  }
}
