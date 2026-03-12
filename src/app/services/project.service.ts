import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = [
    {
      id: 1,
      title: 'Projet Angular',
      subject: 'Développement Web',
      description: 'Créer une application Angular',
      deadline: '2026-04-10',
      status: 'En cours',
      priority: 'Haute'
    },
    {
      id: 2,
      title: 'Rapport sécurité',
      subject: 'Sécurité',
      description: 'Rédiger le rapport',
      deadline: '2026-04-20',
      status: 'À faire',
      priority: 'Moyenne'
    }
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  addProject(project: Project) {
    this.projects.push(project);
  }

}