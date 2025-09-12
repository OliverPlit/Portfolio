import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact-me.component.html',
  styleUrls: [
    './contact-me.component.scss',
    './contact-me-responsive.scss'
  ]
})
export class ContactMeComponent {
  http = inject(HttpClient);



  
  contactData = {
    name: "",
    email: "",
    message: "",
  }

  mailTest = true;

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  // --- NEU: Mehrsprachige Texte ---
  lang: 'de' | 'en' = 'en';
  translations = {
    de: {
      HEADER: 'Kontaktiere mich',
      DESCRIPTION: 'Als Frontend Entwickler bin ich immer auf der Suche nach neuen Herausforderungen und Projekten, bei denen ich mein Wissen einbringen kann. Ich freue mich auf deine Nachricht und darauf, gemeinsam etwas Großartiges zu schaffen.',
      EMAIL_LABEL: 'Email:',
      PHONE_LABEL: 'Tel:',
  PRIVACY_POLICY_CONTACT_PART1: 'Ich habe die ',
    PRIVACY_POLICY_CONTACT_LINK: 'Datenschutzbestimmungen',
    PRIVACY_POLICY_CONTACT_PART2: ' gelesen und stimme der Verarbeitung meiner Daten zu.',      SEND_BUTTON: 'Senden'
    },
    en: {
      HEADER: 'Contact me',
      DESCRIPTION: 'As Frontend Developer, I am always looking for new challenges and projects where I can contribute my knowledge. I look forward to hearing from you and creating something great together.',
      EMAIL_LABEL: 'Email:',
      PHONE_LABEL: 'Tel:',
   PRIVACY_POLICY_CONTACT_PART1: 'I\'ve read the ',
    PRIVACY_POLICY_CONTACT_LINK: 'privacy policy',
    PRIVACY_POLICY_CONTACT_PART2: ' and agree to the processing of my data as outlined.',      SEND_BUTTON: 'Send'
    }
  };

  constructor(private langService: LanguageService) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  t(key: keyof typeof this.translations['en']): string {
    return this.translations[this.lang][key];
  }

  toggleLang(lang: 'de' | 'en') {
    this.langService.setLanguage(lang);
  }

  // --- E-Mail Funktion bleibt unverändert ---
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => ngForm.resetForm(),
          error: (error) => console.error(error),
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }
}
