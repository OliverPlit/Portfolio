import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  @Output() scrollToSection = new EventEmitter<string>();
  goTo(section: string) {
    this.scrollToSection.emit(section);
  }
}

