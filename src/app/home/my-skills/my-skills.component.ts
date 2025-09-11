import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-my-skills',
  imports: [CommonModule],
  templateUrl: './my-skills.component.html',
  styleUrls:[
    './my-skills.component.scss',
    './my-skills-responsive.scss'
  ] 
})
export class MySkillsComponent {
  lang: 'de' | 'en' = 'en';

  translations = {
    de: {
      TITLE: 'Meine Fähigkeiten',
    
    },
    en: {
      TITLE: 'My Skills',
    }
  };

  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  t(key: keyof typeof this.translations['en']): string {
    return this.translations[this.lang][key];
  }
}

