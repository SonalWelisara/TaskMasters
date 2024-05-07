import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  @Output() backClicked = new EventEmitter<boolean>();
  constructor(private location: Location) {} // Inject Location in constructor

  goBack() {
    this.location.back();
    this.backClicked.emit(true);
  }
}
