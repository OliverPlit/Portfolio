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
      DESCRIPTION: 'Ermutige Leute, dich zu kontaktieren und beschreibe, welche Rolle dich interessiert. Zeige Interesse an der Mitarbeit an neuen Projekten.',
      EMAIL_LABEL: 'Email:',
      PHONE_LABEL: 'Tel:',
      PRIVACY_POLICY: 'Ich habe die <a href="">Datenschutzbestimmungen</a> gelesen und stimme der Verarbeitung meiner Daten zu.',
      SEND_BUTTON: 'Senden'
    },
    en: {
      HEADER: 'Contact me',
      DESCRIPTION: 'Encourage people to contact you and describe what role you are interested in. Express interest in contributing to a new project.',
      EMAIL_LABEL: 'Email:',
      PHONE_LABEL: 'Tel:',
      PRIVACY_POLICY: 'I\'ve read the <a href="">privacy policy</a> and agree to the processing of my data as outlined.',
      SEND_BUTTON: 'Send'
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
