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
      DESCRIPTION: 'Ich liebe es zu programmieren, weil ich damit greifbare Ergebnisse erschaffe, die echten Mehrwert bieten. Es motiviert mich, Prozesse zu optimieren, Abläufe zu automatisieren und dabei die Freude am technischen Detail nicht zu verlieren.',
      I_AM: 'Ich bin',
      LOCATED_IN: 'befindet sich in',
      OPEN_TO_RELOCATE: 'bereit umzuziehen',
      OPEN_TO_WORK_REMOTE: 'bereit remote zu arbeiten',
      LETS_TALK: 'Lass uns reden'
    },
    en: {
      TITLE: 'Why me',
      DESCRIPTION: 'I love programming because it allows me to create tangible results that offer real added value. It motivates me to optimize processes and automate procedures, while maintaining a love of technical detail.',
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
