import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
}

interface Statistic {
  number: string;
  label: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  @ViewChild('testimonialTrack', { static: true }) testimonialTrack!: ElementRef;

  currentSlide = 0;
  totalSlides = 5;
  autoPlayInterval: any = null;
  isDragging = false;
  startX = 0;
  currentX = 0;

  testimonials: Testimonial[] = [
    {
      id: 1,
      text: "This product has completely transformed how we work. The intuitive design and powerful features have saved us countless hours. Absolutely incredible!",
      author: "Sarah Johnson",
      position: "CEO",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 2,
      text: "Outstanding service and support! The team went above and beyond to ensure our success. I couldn't be happier with the results we've achieved.",
      author: "Michael Chen",
      position: "Founder",
      company: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 3,
      text: "Game-changing platform! The analytics and insights have helped us make data-driven decisions that boosted our revenue by 150%. Highly recommended!",
      author: "Emily Rodriguez",
      position: "Marketing Director",
      company: "GrowthCo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 4,
      text: "Exceptional quality and reliability. We've been using this for over two years and it continues to exceed our expectations. Simply the best solution available.",
      author: "David Kim",
      position: "CTO",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 5,
      text: "The customer support is phenomenal and the product delivers exactly what was promised. It's rare to find a company that truly cares about their clients' success.",
      author: "Lisa Thompson",
      position: "Operations Manager",
      company: "ScaleUp Inc",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      rating: 5
    }
  ];

  statistics: Statistic[] = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Navigation methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlide();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlide();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateSlide();
  }

  // Update slide position and active states
  updateSlide(): void {
    const translateX = -this.currentSlide * 100;
    if (this.testimonialTrack?.nativeElement) {
      this.testimonialTrack.nativeElement.style.transform = `translateX(${translateX}%)`;
    }
  }

  // Auto-play functionality
  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // Event handlers
  onMouseEnter(): void {
    this.stopAutoPlay();
  }

  onMouseLeave(): void {
    this.startAutoPlay();
  }

  // Touch/swipe handlers
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.isDragging = true;
    this.stopAutoPlay();
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;

    const diffX = this.startX - this.currentX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }

    this.isDragging = false;
    this.startAutoPlay();
  }

  // Utility methods
  isActiveSlide(index: number): boolean {
    return index === this.currentSlide;
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  trackByTestimonial(index: number, testimonial: Testimonial): number {
    return testimonial.id;
  }

  trackByStatistic(index: number, statistic: Statistic): string {
    return statistic.label;
  }
}
