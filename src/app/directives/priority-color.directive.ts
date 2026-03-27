import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appPriorityColor]'
})
export class PriorityColorDirective {
  @HostBinding('class.priority-high') isHigh = false;
  @HostBinding('class.priority-medium') isMedium = false;
  @HostBinding('class.priority-low') isLow = false;

  @Input() set appPriorityColor(value: string) {
    // Active la classe CSS liee a la priorite recue
    this.isHigh = value === 'Haute';
    this.isMedium = value === 'Moyenne';
    this.isLow = value === 'Basse';
  }
}
