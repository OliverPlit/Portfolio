import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';
import { LegalNotice } from './legal-notice';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {
  private langService = inject(LanguageService);
  lang: 'de' | 'en' = 'en';

  constructor() {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  t(key: keyof typeof LegalNotice['en']): string {
    return LegalNotice[this.lang][key];
  }
}
