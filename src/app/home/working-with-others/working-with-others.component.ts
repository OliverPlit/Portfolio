import { Component } from '@angular/core';
import {Feedbacks} from './working-with-me';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

type Lang = 'de' | 'en';

@Component({
  selector: 'app-working-with-others',
  imports: [CommonModule],
  templateUrl: './working-with-others.component.html',
  styleUrls: ['./working-with-others.component.scss',
  './working-with-others-responsive.scss']
})
export class WorkingWithOthersComponent {
lang: Lang = 'en';

  translations = {
    de: {
      HEADER: 'Brauchen Sie einen Teamplayer? <span class="breakable">Hier ist, was meine Kollegen über mich gesagt haben</span>',
      DESCRIPTIONS: [
        'Oliver war im Team eine starke Unterstützung – sehr hilfsbereit, zuverlässig und mit vielen kreativen Ideen. Seine Beiträge haben das Projekt nicht nur vorangebracht, sondern auch bereichert. Die Zusammenarbeit mit ihm war durchweg positiv und hat richtig Spaß gemacht.',
        'Mit Oli hatten wir einen Partner, der sehr gut in unser Team passte. Er hat seinen Aufgabenbereich zuverlässig entwickelt, sodass wir mit unserem Projekt gut vorangekommen sind.',
        'Oli hat sich aktiv an den Gruppengesprächen beteiligt und mit seiner offenen Art zu einer angenehmen Zusammenarbeit beigetragen. Besonders in den Diskussionen konnte er eigene Gedanken einbringen und so die Arbeit im Team bereichern.'
      ]
    },
    en: {
      HEADER: 'Need a team player? <span class="breakable">Here is what my colleagues said about me</span>',
      DESCRIPTIONS: [
        'Oliver was a strong support in the team – very helpful, reliable and full of creative ideas. His contributions advanced and enriched the project. Working with him was consistently positive and fun.',
        'With Oli we had a partner who fit very well into our team. He reliably developed his tasks, so our project progressed smoothly.',
        'Oli actively participated in group discussions and contributed to a pleasant collaboration with his open manner. Especially in discussions, he could contribute his own ideas, enriching the team’s work.'
      ]
    }
  };

  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  get feedbacks() {
    return Feedbacks.map((fb, idx) => ({
      ...fb,
      description: this.translations[this.lang].DESCRIPTIONS[idx]
    }));
  }

  t(key: keyof typeof this.translations['en']) {
    return this.translations[this.lang][key];
  }
}

