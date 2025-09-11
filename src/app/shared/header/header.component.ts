import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-responsive.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  lang: 'de' | 'en' = 'en';

  translations = {
    de: {
      NAV_WHY_ME: 'Über mich',
      NAV_SKILLS: 'Fähigkeiten',
      NAV_PROJECTS: 'Projekte',
      NAV_CONTACT: 'Kontakt'
    },
    en: {
      NAV_WHY_ME: 'Why me',
      NAV_SKILLS: 'Skills',
      NAV_PROJECTS: 'Projects',
      NAV_CONTACT: 'Contact'
    }
  };

  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  switchLang(lang: 'de' | 'en') {
    this.langService.setLanguage(lang);
  }

  t(key: keyof typeof this.translations['en']): string {
    return this.translations[this.lang][key];
  }
}
