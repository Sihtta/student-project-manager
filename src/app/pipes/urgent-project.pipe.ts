import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project.model';

@Pipe({
  name: 'urgentProject'
})
export class UrgentProjectPipe implements PipeTransform {

  transform(projects: Project[]): Project[] {
    const today = new Date();

    return projects.filter(project => {
      const deadline = new Date(project.deadline);
      const diffTime = deadline.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      return diffDays >= 0 && diffDays <= 7 && project.status !== 'Terminé';
    });
  }

}