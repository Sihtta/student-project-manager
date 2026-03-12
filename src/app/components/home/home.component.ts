import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  projects: Project[] = [];

  tips: string[] = [
    'Commence par la tâche la plus difficile.',
    'Découpe un gros projet en petites étapes.',
    'Fixe-toi un objectif clair pour chaque séance.',
    'Travaille d’abord sur ce qui a la date limite la plus proche.',
    'Évite de tout faire au dernier moment.',
    'Relis toujours les consignes avant de commencer.',
    'Prévois une marge avant la date limite.',
    'Note les points bloquants dès qu’ils apparaissent.',
    'Fais des pauses courtes mais régulières.',
    'Commence même si tout n’est pas encore parfait.',
    'Teste souvent ton travail au lieu d’attendre la fin.',
    'Garde une version propre de ton projet.',
    'Priorise l’essentiel avant les détails.',
    'Un petit avancement vaut mieux qu’aucun.',
    'Vérifie ton projet avec les critères d’évaluation.',
    'Organise tes fichiers dès le début.',
    'Pense à sauvegarder régulièrement ton travail.',
    'Quand tu bloques, reviens à une version simple.',
    'Compare ton avancement avec la deadline, pas avec les autres.',
    'Terminer un projet est plus utile que le perfectionner sans fin.'
  ];

  currentTip: string = '';

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
    this.currentTip = this.getRandomTip();
  }

  get totalProjects(): number {
    return this.projects.length;
  }

  get completedProjects(): number {
    return this.projects.filter(project => project.status === 'Terminé').length;
  }

  get inProgressProjects(): number {
    return this.projects.filter(project => project.status === 'En cours').length;
  }

  get urgentProjects(): number {
    return this.projects.filter(project => project.priority === 'Haute').length;
  }

  get nextProject(): Project | undefined {
    const activeProjects = this.projects.filter(project => project.status !== 'Terminé');

    if (activeProjects.length === 0) {
      return undefined;
    }

    return activeProjects.sort((a, b) =>
      new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )[0];
  }

  get dynamicMessage(): string {
    if (this.totalProjects === 0) {
      return 'Aucun projet n’est encore enregistré.';
    }

    if (this.completedProjects === this.totalProjects) {
      return 'Tous vos projets sont terminés.';
    }

    if (this.urgentProjects > 0) {
      return `Attention : ${this.urgentProjects} projet(s) prioritaire(s) à surveiller.`;
    }

    if (this.inProgressProjects > 0) {
      return `Vous avez ${this.inProgressProjects} projet(s) en cours.`;
    }

    return `Vous avez ${this.totalProjects} projet(s) à gérer.`;
  }

  getRandomTip(): string {
    const index = Math.floor(Math.random() * this.tips.length);
    return this.tips[index];
  }

}