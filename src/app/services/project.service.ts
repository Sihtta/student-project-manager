import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private storageKey = 'projects';

  // Donnees initiales au premier lancement
  private projects: Project[] = [
    {
      id: 1,
      title: 'Exemple1',
      subject: 'Web',
      description: 'Créer une application Angular',
      deadline: '2026-03-22',
      status: 'En cours',
      priority: 'Haute'
    },
    {
      id: 2,
      title: 'Exemple2',
      subject: 'Base de données',
      description: 'Faire le schéma relationnel',
      deadline: '2026-03-25',
      status: 'À faire',
      priority: 'Moyenne'
    }
  ];

  constructor() {
    // Recharge les donnees sauvegardees si elles existent
    this.loadProjects();
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  addProject(projectData: Omit<Project, 'id'>): void {
    const newProject: Project = {
      // Genere un id a partir du plus grand id existant
      id: this.projects.length > 0
        ? Math.max(...this.projects.map(project => project.id)) + 1
        : 1,
      ...projectData
    };

    this.projects.push(newProject);
    this.saveProjects();
  }

  updateProjectStatus(id: number, status: Project['status']): void {
    const project = this.projects.find(project => project.id === id);

    if (project) {
      project.status = status;
      this.saveProjects();
    }
  }

  private saveProjects(): void {
    // Sauvegarde la liste dans le navigateur
    localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex(p => p.id === updatedProject.id);

    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.saveProjects();
    }
  }

  deleteProject(id: number): void {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjects();
  }

  private loadProjects(): void {
    const storedProjects = localStorage.getItem(this.storageKey);

    if (storedProjects) {
      // Recharge les projets deja stockes localement
      this.projects = JSON.parse(storedProjects);
    } else {
      this.saveProjects();
    }
  }
}
