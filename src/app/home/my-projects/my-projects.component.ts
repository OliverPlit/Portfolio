import { Component } from '@angular/core';
import { Projects } from './my-projects';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-projects',
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss',
    './my-projects-responsive.scss']
})
export class MyProjectsComponent {
  projects = Projects;

}
