import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

import { PriorityColorDirective } from '../../directives/priority-color.directive';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, PriorityColorDirective],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  previewProject$!: Observable<any>;
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      description: ['', [Validators.minLength(5), Validators.maxLength(200)]],
      deadline: ['', [Validators.required, this.futureDateValidator()]],
      status: ['À faire', [Validators.required]],
      priority: ['Moyenne', [Validators.required]]
    });

    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.projectId) {
      const project = this.projectService.getProjectById(this.projectId);

      if (project) {
        this.projectForm.patchValue({
          title: project.title,
          subject: project.subject,
          description: project.description,
          deadline: project.deadline,
          status: project.status,
          priority: project.priority
        });
      }
    }

    this.previewProject$ = this.projectForm.valueChanges.pipe(
      startWith(this.projectForm.value),
      map(formValue => ({
        id: this.projectId ?? 0,
        title: formValue.title,
        subject: formValue.subject,
        description: formValue.description,
        deadline: formValue.deadline,
        status: formValue.status,
        priority: formValue.priority
      }))
    );
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      return this.isPastOrToday(value) ? { invalidDeadline: true } : null;
    };
  }

  isPastOrToday(dateValue: string): boolean {
    const selectedDate = new Date(dateValue);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate <= today;
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      if (this.projectId) {
        this.projectService.updateProject({
          id: this.projectId,
          ...this.projectForm.value
        });
      } else {
        this.projectService.addProject(this.projectForm.value);
      }

      this.router.navigate(['/projects']);
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  get title() {
    return this.projectForm.get('title');
  }

  get subject() {
    return this.projectForm.get('subject');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get deadline() {
    return this.projectForm.get('deadline');
  }
}