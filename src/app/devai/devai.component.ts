import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Integration {
  name: string;
  icon: string;
  connected: boolean;
  status: string;
  color: string;
}

interface JiraTicket {
  id: string;
  title: string;
  clarityScore: number;
  status: 'needs-review' | 'clarified' | 'in-progress';
  aiQuestions: string[];
  type: 'story' | 'bug' | 'epic';
}

interface PullRequest {
  id: string;
  title: string;
  author: string;
  riskLevel: 'low' | 'medium' | 'high';
  linesChanged: number;
  filesImpacted: number;
  aiSummary: string;
  testSuggestions: string[];
}

interface SprintMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

@Component({
  selector: 'app-devai',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devai.component.html',
  styleUrls: ['./devai.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.3s ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pulse', [
      state('active', style({ transform: 'scale(1.05)' })),
      state('inactive', style({ transform: 'scale(1)' })),
      transition('inactive => active', animate('0.2s ease-in')),
      transition('active => inactive', animate('0.2s ease-out'))
    ])
  ]
})
export class DevaiComponent implements OnInit {
  currentStep = 1;
  totalSteps = 5;

  integrations: Integration[] = [
    { name: 'Jira', icon: '🎯', connected: true, status: 'Connected', color: '#0052cc' },
    { name: 'GitHub', icon: '🐙', connected: true, status: 'Syncing...', color: '#24292e' },
    { name: 'Azure DevOps', icon: '🔷', connected: false, status: 'Not Connected', color: '#0078d4' }
  ];

  jiraTickets: JiraTicket[] = [
    {
      id: 'SUB-123',
      title: 'Add user validation to subscription system',
      clarityScore: 45,
      status: 'needs-review',
      type: 'story',
      aiQuestions: [
        'What type of validation is required?',
        'Should this apply to frontend or backend?',
        'What is the expected fallback behavior?',
        'Should errors be logged to analytics?'
      ]
    },
    {
      id: 'SUB-124',
      title: 'Fix payment gateway timeout issues',
      clarityScore: 90,
      status: 'clarified',
      type: 'bug',
      aiQuestions: []
    },
    {
      id: 'SUB-125',
      title: 'Implement subscription upgrade flow',
      clarityScore: 72,
      status: 'in-progress',
      type: 'epic',
      aiQuestions: [
        'Should users be able to downgrade immediately?',
        'How should proration be handled?'
      ]
    }
  ];

  pullRequests: PullRequest[] = [
    {
      id: 'PR-456',
      title: 'Add authentication middleware for subscription endpoints',
      author: 'sarah.dev',
      riskLevel: 'high',
      linesChanged: 234,
      filesImpacted: 8,
      aiSummary: 'Adds JWT validation to subscription API endpoints. Touches authentication core module.',
      testSuggestions: [
        'Test unauthenticated users receive 401',
        'Verify expired tokens are rejected',
        'Check valid tokens allow API access',
        'Test rate limiting on auth endpoints'
      ]
    },
    {
      id: 'PR-457',
      title: 'Update subscription pricing display',
      author: 'mike.frontend',
      riskLevel: 'low',
      linesChanged: 45,
      filesImpacted: 3,
      aiSummary: 'Updates UI components to display new pricing tiers. No business logic changes.',
      testSuggestions: [
        'Verify pricing displays correctly',
        'Test responsive layout on mobile'
      ]
    }
  ];

  sprintMetrics: SprintMetric[] = [
    { label: 'Stories Clarified', value: 85, unit: '%', trend: 'up', change: 12 },
    { label: 'Avg Clarification Time', value: 2.3, unit: 'hrs', trend: 'down', change: -0.8 },
    { label: 'Developer Velocity', value: 42, unit: 'pts', trend: 'up', change: 8 },
    { label: 'PR Review Time', value: 4.1, unit: 'hrs', trend: 'down', change: -1.2 }
  ];

  activeTab: 'overview' | 'jira' | 'github' | 'metrics' = 'overview';
  animationState = 'inactive';

  ngOnInit() {
    this.startProgressAnimation();
  }

  startProgressAnimation() {
    setInterval(() => {
      this.currentStep = (this.currentStep % this.totalSteps) + 1;
    }, 4000);
  }

  setActiveTab(tab: 'overview' | 'jira' | 'github' | 'metrics') {
    this.activeTab = tab;
    this.animationState = 'active';
    setTimeout(() => this.animationState = 'inactive', 200);
  }

  connectIntegration(integrationName: string) {
    const integration = this.integrations.find(i => i.name === integrationName);
    if (integration) {
      integration.connected = true;
      integration.status = 'Connected';
    }
  }

  getClarityScoreColor(score: number): string {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  getRiskLevelColor(level: string): string {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '—';
    }
  }

  refreshData() {
    // Simulate data refresh
    this.integrations.forEach(integration => {
      if (integration.connected && integration.name === 'GitHub') {
        integration.status = Math.random() > 0.5 ? 'Syncing...' : 'Connected';
      }
    });
  }
}
