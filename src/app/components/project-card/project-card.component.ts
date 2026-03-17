import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PriorityColorDirective } from '../../directives/priority-color.directive';
import { Project } from '../../models/project.model';

type ProjectColumn = 'todo' | 'in-progress' | 'done';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, PriorityColorDirective, DatePipe],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Input({ required: true }) column!: ProjectColumn;

  @Output() moveForward = new EventEmitter<Project>();
  @Output() moveBackward = new EventEmitter<Project>();
  @Output() deleteRequested = new EventEmitter<number>();

  get canMoveBackward(): boolean {
    return this.column !== 'todo';
  }

  get canMoveForward(): boolean {
    return this.column !== 'done';
  }

  get backwardLabel(): string {
    if (this.column === 'in-progress') {
      return 'Revenir à "A faire"';
    }

    return 'Revenir à "En cours"';
  }

  get forwardLabel(): string {
    if (this.column === 'todo') {
      return 'Commencer le projet';
    }

    return 'Terminer le projet';
  }

  onMoveForward(): void {
    this.moveForward.emit(this.project);
  }

  onMoveBackward(): void {
    this.moveBackward.emit(this.project);
  }

  onDelete(): void {
    this.deleteRequested.emit(this.project.id);
  }
}
