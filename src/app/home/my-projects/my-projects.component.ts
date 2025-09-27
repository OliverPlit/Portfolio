import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projects } from './my-projects';
import { LanguageService } from '../../language.service';

type Lang = 'de' | 'en';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss', './my-projects-responsive.scss']
})
export class MyProjectsComponent {
  lang: Lang = 'en';

  translations = {
    de: {
      PROJECTS_HEADER: 'Meine Projekte',
      PROJECTS: [
        {
          title: 'Join',
          technologies: 'Angular | TypeScript | HTML | CSS | Firebase',
          description: 'Task Manager inspiriert vom Kanban System. Erstelle und organisiere Aufgaben per Drag & Drop, weise Nutzer und Kategorien zu.'
        },
        {
          title: 'Pollo Loco',
          technologies: 'JavaScript | HTML | CSS',
          description: 'Jump, Run & Throw Game. Hilf Pepe Münzen und Tabasco zu finden, um gegen die verrückte Henne zu kämpfen.'
        },
        {
          title: 'DaBubble',
          technologies: 'Angular | TypeScript | HTML | CSS | Firebase',
          description: 'Task Manager inspiriert vom Kanban System. Aufgaben erstellen und organisieren, Nutzer und Kategorien zuweisen.'
        }
      ]
    },
    en: {
      PROJECTS_HEADER: 'My Projects',
      PROJECTS: [
        {
          title: 'Join',
          technologies: 'Angular | TypeScript | HTML | CSS | Firebase',
          description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.'
        },
        {
          title: 'Pollo Loco',
          technologies: 'JavaScript | HTML | CSS',
          description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.'
        },
        {
          title: 'DaBubble',
          technologies: 'Angular | TypeScript | HTML | CSS | Firebase',
          description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.'
        }
      ]
    }
  };

  constructor(private langService: LanguageService, private el: ElementRef) {
    this.langService.lang$.subscribe(l => this.lang = l);
  }

  get projects() {
    return Projects.map((proj, idx) => ({
      ...proj,                    
      ...this.translations[this.lang].PROJECTS[idx] 
    }));
  }

  t(key: keyof typeof this.translations['en']) {
    return this.translations[this.lang][key];
  }



}
  


