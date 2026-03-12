import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private storageKey = 'projects';

  private projects: Project[] = [
    {
      id: 1,
      title: 'SAE Angular',
      subject: 'Web',
      description: 'Créer une application Angular',
      deadline: '2026-03-20',
      status: 'En cours',
      priority: 'Haute'
    },
    {
      id: 2,
      title: 'Projet BDD',
      subject: 'Base de données',
      description: 'Faire le schéma relationnel',
      deadline: '2026-03-25',
      status: 'À faire',
      priority: 'Moyenne'
    }
  ];

  constructor() {
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
      id: this.projects.length > 0
        ? Math.max(...this.projects.map(project => project.id)) + 1
        : 1,
      ...projectData
    };

    this.projects.push(newProject);
    this.saveProjects();
  }

  private saveProjects(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
  }

  private loadProjects(): void {
    const storedProjects = localStorage.getItem(this.storageKey);

    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    } else {
      this.saveProjects();
    }
  }
}