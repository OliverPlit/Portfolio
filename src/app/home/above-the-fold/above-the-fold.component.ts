import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './above-the-fold.component.html',
  styleUrls: ['./above-the-fold.component.scss', './above-the-folder-responsive.scss']
})
export class AboveTheFoldComponent implements AfterViewInit {
  private el = inject(ElementRef);

  constructor(public langService: LanguageService) {}

 ngAfterViewInit(): void {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    setTimeout(() => {
      const elements = this.el.nativeElement.querySelectorAll('.animate_left, .animate_right, .animate_rotate');

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
