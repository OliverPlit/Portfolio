import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
  this.router.navigate([path]).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  });
}
}