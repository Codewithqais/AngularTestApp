import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';
import { CATComponent } from './cat/cat.component';
import { CopilotComponent } from './copilot/copilot.component';
import { HeroLandingComponent } from './hero-landing/hero-landing.component';
import { AppComponent } from './app.component';
import { MainsectionComponent } from './mainsection/mainsection.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { PagenotfountComponent } from './pagenotfount/pagenotfount.component';

export const routes: Routes = [
{path:"landing", component:LandingPageComponent},
{path:"contact", component:ContactComponent},
{path:"cat", component:CATComponent},
{path:"copilet", component:CopilotComponent},
{path:"hero", component:HeroLandingComponent},
{path:"main", component:MainsectionComponent},
{path:"sidebar", component:SidebarComponent},
{path:"testimonials", component:TestimonialsComponent},
 {path:"**", component:PagenotfountComponent},

];
