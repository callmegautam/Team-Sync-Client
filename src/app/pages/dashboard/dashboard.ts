
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, IconComponent],
    templateUrl: './dashboard.html',
})
export class DashboardComponent {
    stats = [
        { label: 'Page Views', value: '12,450', change: '+15.8%', isPositive: true, icon: 'eye' },
        { label: 'Total Revenue', value: '$363.95', change: '-34.0%', isPositive: false, icon: 'dollar-sign' },
        { label: 'Bounce Rate', value: '86.5%', change: '+24.2%', isPositive: true, icon: 'activity' },
    ];

    integrations = [
        { name: 'Stripe', type: 'Finance', rate: '40%', profit: '$650.00', icon: 'wallet' },
        { name: 'Zapier', type: 'CRM', rate: '80%', profit: '$720.50', icon: 'check-circle' },
        { name: 'Shopify', type: 'Marketplace', rate: '20%', profit: '$432.25', icon: 'smartphone' },
    ];
}
