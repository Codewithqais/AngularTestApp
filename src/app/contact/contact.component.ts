import { Component } from '@angular/core';
import {  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


}
