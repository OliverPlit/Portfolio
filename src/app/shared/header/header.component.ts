import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
  './header-responsive.scss']
})

export class HeaderComponent {
    isMenuOpen = false;

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }


    closeMenu() {
      if (this.isMenuOpen) {
         this.isMenuOpen = false
      }
       
    }
}

