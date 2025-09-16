import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../language.service';
import { Router } from '@angular/router';


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
  private router = inject(Router);



   goTo(path: string) {
    this.router.navigate([path]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
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
 acceptedPrivacy = false;
successMsg = '';

touched = { name: false, email: false, message: false, privacy: false };

markTouched(field: 'name' | 'email' | 'message' | 'privacy') {
  this.touched[field] = true;
}

onSubmit(ngForm: NgForm) {
  // Alle Felder als touched markieren, falls Submit gedrückt wird
  Object.keys(this.touched).forEach(key => this.touched[key as keyof typeof this.touched] = true);

  if (ngForm.valid) {
    console.log("Daten zum Senden:", this.contactData, "Privacy akzeptiert:", this.acceptedPrivacy);

    if (!this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            console.log("Server Response:", response);
            this.successMsg = 'Formular erfolgreich versendet!';
            ngForm.resetForm();
            this.acceptedPrivacy = false;
            Object.keys(this.touched).forEach(key => this.touched[key as keyof typeof this.touched] = false);
          },
          error: (error) => console.error(error),
          complete: () => console.info('send post complete'),
        });
    } else {
      this.successMsg = 'Email erfolgreich versendet!';
      ngForm.resetForm();
      this.acceptedPrivacy = false;
      Object.keys(this.touched).forEach(key => this.touched[key as keyof typeof this.touched] = false);
    }
  } else {
    this.successMsg = '';
    console.warn('Formular ungültig!');
  }
}
}
