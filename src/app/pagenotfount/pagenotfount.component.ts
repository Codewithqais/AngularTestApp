import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { provideLottieOptions } from 'ngx-lottie';


@Component({
  selector: 'app-pagenotfount',
  imports: [ CommonModule,LottieComponent],
  templateUrl: './pagenotfount.component.html',
  styleUrl: './pagenotfount.component.css'
})
export class PagenotfountComponent {
  options: AnimationOptions = {
    path:'https://lottie.host/de37a5f3-2b74-4510-a8ad-5aebe9dbc119/DtOYIOrbGk.lottie', // Local path recommended
    loop: true,
    autoplay: true,
  };
  constructor() {}

  // Handle animation creation
  onAnimationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
