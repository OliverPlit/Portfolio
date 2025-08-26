import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AboveTheFoldComponent} from './above-the-fold/above-the-fold.component';
import {WhyMeComponent} from './why-me/why-me.component'
import {MySkillsComponent} from './my-skills/my-skills.component'
import {MyProjectsComponent} from './my-projects/my-projects.component'
import {WorkingWithOthersComponent} from './working-with-others/working-with-others.component'
import {FooterComponent} from './shared/footer/footer.component'
import {HeaderComponent} from './shared/header/header.component'
import {ContactMeComponent} from './contact-me/contact-me.component'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AboveTheFoldComponent, WhyMeComponent, MySkillsComponent, MyProjectsComponent, WorkingWithOthersComponent, FooterComponent, HeaderComponent, ContactMeComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
}
