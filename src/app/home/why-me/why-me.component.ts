import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-me.component.html',
  styleUrls: ['./why-me.component.scss', './why-me-responsive.scss']
})
export class WhyMeComponent {
  lang: 'de' | 'en' = 'en';

  translations = {
    de: {
      TITLE: 'Über mich',
      DESCRIPTION: 'Schreibe etwas über dich, das mit IT zu tun hat. Warum bist du begeistert vom Programmieren? ...',
      I_AM: 'Ich bin',
      LOCATED_IN: 'befindet sich in',
      OPEN_TO_RELOCATE: 'bereit umzuziehen',
      OPEN_TO_WORK_REMOTE: 'bereit remote zu arbeiten',
      LETS_TALK: 'Lass uns reden'
    },
    en: {
      TITLE: 'Why me',
      DESCRIPTION: 'Write some information about yourself that is IT related. Why are you passionate about coding? ...',
      I_AM: 'I am',
      LOCATED_IN: 'located in',
      OPEN_TO_RELOCATE: 'open to relocate',
      OPEN_TO_WORK_REMOTE: 'open to work remote',
      LETS_TALK: "Let's talk"
    }
  };

  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  t(key: keyof typeof this.translations['en']): string {
    return this.translations[this.lang][key];
  }
}
