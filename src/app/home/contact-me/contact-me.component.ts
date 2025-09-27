import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-me.component.html',
  styleUrls: [
    './contact-me.component.scss',
    './contact-me-responsive.scss'
  ]
})
export class ContactMeComponent implements AfterViewInit {
  http = inject(HttpClient);
  private router = inject(Router);
  private el = inject(ElementRef); // ElementRef für IntersectionObserver

  // --- Language & Translations ---
  lang: 'de' | 'en' = 'en';
  translations = {
    de: {
      HEADER: 'Kontaktiere mich',
      DESCRIPTION: 'Als Frontend Entwickler bin ich immer auf der Suche nach neuen Herausforderungen',
      EMAIL_LABEL: 'Email:',
      PHONE_LABEL: 'Tel:',
      PRIVACY_POLICY_CONTACT_PART1: 'Ich habe die ',
      PRIVACY_POLICY_CONTACT_LINK: 'Datenschutzbestimmungen',
      PRIVACY_POLICY_CONTACT_PART2: ' gelesen und stimme der Verarbeitung meiner Daten zu.',
      SEND_BUTTON: 'Senden',
      NAME_INPUT: 'Dein Name',
      MAIL_INPUT: 'Deine Email',
      MESSAGE_INPUT: 'Deine Nachricht',
    },
    en: {
      HEADER: 'Contact me',
      DESCRIPTION: 'As Frontend Developer, I am always looking for new challenges',
      EMAIL_LABEL: 'Email:',
      PHONE_LABEL: 'Tel:',
      PRIVACY_POLICY_CONTACT_PART1: 'I\'ve read the ',
      PRIVACY_POLICY_CONTACT_LINK: 'privacy policy',
      PRIVACY_POLICY_CONTACT_PART2: ' and agree to the processing of my data.',
      SEND_BUTTON: 'Send',
      NAME_INPUT: 'Your Name',
      MAIL_INPUT: 'Your Email',
      MESSAGE_INPUT: 'Your Message',
    }
  };

  contactData = { name: "", email: "", message: "" };
  acceptedPrivacy = false;
  successMsg = '';
  touched = { name: false, email: false, message: false, privacy: false };

  post = {
    endPoint: 'https://oliver-plit.com/',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: { 'Content-Type': 'text/plain', responseType: 'text' },
    },
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

  markTouched(field: 'name' | 'email' | 'message' | 'privacy') {
    this.touched[field] = true;
  }

  onSubmit(ngForm: NgForm) {
    Object.keys(this.touched).forEach(key => this.touched[key as keyof typeof this.touched] = true);

    if (ngForm.valid) {
      this.http.post(this.post.endPoint, this.contactData, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'
      }).subscribe({
        next: response => {
          this.successMsg = 'Formular erfolgreich versendet!';
          ngForm.resetForm();
          this.acceptedPrivacy = false;
          Object.keys(this.touched).forEach(key => this.touched[key as keyof typeof this.touched] = false);
        },
        error: error => {
          console.error(error);
          this.successMsg = 'Fehler beim Senden der Mail!';
        }
      });
    }
  }

  goTo(path: string) {
    this.router.navigate([path]).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      setTimeout(() => {
        const elements = this.el.nativeElement.querySelectorAll('.animate_left');

        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });

        elements.forEach((el: HTMLElement) => observer.observe(el));
      }, 50);
    }
  }
}
