import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-business-header',
  templateUrl: './business-header.component.html',
  styleUrls: ['./business-header.component.scss']
})
export class BusinessHeaderComponent {
  @Input() buttons: string[];
  @Output('onBurgerClick')
  burgerClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output('onActionClick')
  actionClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  isButtonClicked: boolean = false;

  constructor() { }

  onActionClick(): void {
    this.actionClick.emit(true);
  }

  onBurgerClick(): void {
    this.isButtonClicked = !this.isButtonClicked;
    this.burgerClick.emit(this.isButtonClicked);
  }
}
