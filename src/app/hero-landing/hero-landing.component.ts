import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-landing',
  standalone:true,
  imports: [],
  templateUrl: './hero-landing.component.html',
  styleUrl: './hero-landing.component.css'
})
export class HeroLandingComponent {
particles = Array.from({ length: 15 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 20 + 5,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5
  }));
}
