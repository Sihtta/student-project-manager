import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { PriorityColorDirective } from '../../directives/priority-color.directive';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [PriorityColorDirective],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.project = this.projectService.getProjectById(id);

  }

}