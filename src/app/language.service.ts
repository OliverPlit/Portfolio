import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Lang = 'de' | 'en';
type Translations = {
  NAV_WHY_ME: string;
  NAV_SKILLS: string;
  NAV_PROJECTS: string;
  NAV_CONTACT: string;
  HERO_JOB: string;
  HERO_NAME: string;
  CONTACT_ME: string;
  LEGAL_NOTICE: string;        
  PRIVACY_POLICY: string;     
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLang$ = new BehaviorSubject<Lang>('en');
  lang$ = this.currentLang$.asObservable();

  private translations: Record<Lang, Translations> = {
    de: {
      NAV_WHY_ME: 'Über mich',
      NAV_SKILLS: 'Fähigkeiten',
      NAV_PROJECTS: 'Projekte',
      NAV_CONTACT: 'Kontakt',
      HERO_JOB: 'FRONTEND ENTWICKLER',
      HERO_NAME: 'Oliver Plit',
      CONTACT_ME: 'KONTAKTIERE MICH',
      LEGAL_NOTICE: 'Impressum',            
      PRIVACY_POLICY: 'Datenschutzerklärung'
    },
    en: {
      NAV_WHY_ME: 'Why me',
      NAV_SKILLS: 'Skills',
      NAV_PROJECTS: 'Projects',
      NAV_CONTACT: 'Contact',
      HERO_JOB: 'FRONTEND DEVELOPER',
      HERO_NAME: 'Oliver Plit',
      CONTACT_ME: 'CONTACT ME',
      LEGAL_NOTICE: 'Legal Notice',        
      PRIVACY_POLICY: 'Privacy Policy'
    }
  };

  setLanguage(lang: Lang) {
    this.currentLang$.next(lang);
  }

  translate(key: keyof Translations): string {
    const lang = this.currentLang$.value;
    return this.translations[lang][key];
  }
}
