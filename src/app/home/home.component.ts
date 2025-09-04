import { Component } from '@angular/core';
import {AboveTheFoldComponent} from './above-the-fold/above-the-fold.component';
import {WhyMeComponent} from './why-me/why-me.component'
import {MySkillsComponent} from './my-skills/my-skills.component'
import {MyProjectsComponent} from './my-projects/my-projects.component'
import {WorkingWithOthersComponent} from './working-with-others/working-with-others.component'
import {ContactMeComponent} from './contact-me/contact-me.component'
@Component({
  selector: 'app-home',
  imports: [AboveTheFoldComponent,WhyMeComponent, MySkillsComponent, MyProjectsComponent,WorkingWithOthersComponent,ContactMeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
