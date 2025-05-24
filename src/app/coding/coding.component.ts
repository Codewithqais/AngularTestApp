import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-coding',
  imports: [CommonModule],
  templateUrl: './coding.component.html',
  styleUrl: './coding.component.css'
})
export class CodingComponent {
 title = 'Accelerate performance';
  description = 'With GitHub Copilot embedded throughout the platform, you can simplify your toolchain, automate tasks, and improve the developer experience.';

  features = [
    {
      title: 'Gallery',
      description: 'Listing latest issues'
    },
    {
      title: 'momake',
      items: [
        'Gallery: List Related Issues'
      ]
    }
  ];

  latestIssues = [
    'Open Solutions to affordware, kernel and camera sprites',
    'Create the database/access',
    'Insert new database/access',
    'Substitute ongoing',
    'Open Inperson names, in-person APIs',
    'Project ID: 5409350243455',
    'Project PDF: 50@inforce.internal'
  ];
}
