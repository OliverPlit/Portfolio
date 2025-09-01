import { Component } from '@angular/core';
import {Feedbacks} from './working-with-me';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-working-with-others',
  imports: [CommonModule],
  templateUrl: './working-with-others.component.html',
  styleUrl: './working-with-others.component.scss'
})
export class WorkingWithOthersComponent {
feedbacks = Feedbacks;
}
