import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeSection = 0;

  medicalItems = [
    'Surgical Devices',
    'Compounding Consumables',
    'Dialysis / Renal',
    'First Aid & Safety',
    'Sterilization Services'
  ];

  liquidItems = [
    'Cosmetics',
    'Herbal Extracts',
    'Flammable Liquids',
    'Alcohol Sprays & Disinfectants'
  ];

  private wheelLocked = false;

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    event.preventDefault();

    if (this.wheelLocked || Math.abs(event.deltaY) < 10) {
      return;
    }

    if (event.deltaY > 0 && this.activeSection < 4) {
      this.activeSection++;
    } else if (event.deltaY < 0 && this.activeSection > 0) {
      this.activeSection--;
    } else {
      return;
    }

    this.scrollToSection();

    this.wheelLocked = true;

    setTimeout(() => {
      this.wheelLocked = false;
    }, 900);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();

      if (this.activeSection < 4) {
        this.activeSection++;
        this.scrollToSection();
      }
    }

    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();

      if (this.activeSection > 0) {
        this.activeSection--;
        this.scrollToSection();
      }
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.goTo(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.goTo(4);
    }
  }

  goTo(section: number): void {
    if (section < 0 || section > 4) {
      return;
    }

    this.activeSection = section;
    this.scrollToSection();
  }

  private scrollToSection(): void {
    const section = document.getElementById(
      `section-${this.activeSection}`
    );

    section?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}