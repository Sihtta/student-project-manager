import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { PriorityColorDirective } from '../../directives/priority-color.directive';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [PriorityColorDirective, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.project = this.projectService.getProjectById(id);

  }

  goBack(): void {
      this.location.back();
  }

}