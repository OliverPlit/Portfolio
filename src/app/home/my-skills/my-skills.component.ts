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
    HOVER_TEXT: 'Ich lerne immer gerne neue Technologien – sag mir einfach, was du brauchst.',
    RESPONSIVE_TEXT: 'Ich lerne immer gerne neue Technologien.'
  },
  en: {
    TITLE: 'My Skills',
    HOVER_TEXT: 'I am always happy to learn new technologies, just tell me what you need.',
    RESPONSIVE_TEXT: 'I am always happy to learn new technologies.'
  }
};


  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  t(key: keyof typeof this.translations['en']): string {
    return this.translations[this.lang][key];
  }
}

