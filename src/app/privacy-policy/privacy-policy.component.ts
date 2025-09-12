import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';
import { PrivacyPolicy } from '../privacy-policy/privacy-police';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  private langService = inject(LanguageService);
  lang: 'de' | 'en' = 'en';

  constructor() {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  t(key: keyof typeof PrivacyPolicy['en']): any {
    return PrivacyPolicy[this.lang][key];
  }
}
