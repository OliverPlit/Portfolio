import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer-responsive.scss']
})
export class FooterComponent {
  private router = inject(Router);
  private langService = inject(LanguageService);

  t(key: 'LEGAL_NOTICE' | 'PRIVACY_POLICY'): string {
    return this.langService.translate(key);
  }

  goTo(path: string) {
    this.router.navigate([path]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
