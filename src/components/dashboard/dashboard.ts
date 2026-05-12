import {Component, OnInit} from '@angular/core';
import {DashboardStats, TradingSignal} from '../../models/signals.model';
import {SignalService} from '../../services/signal.service';
import {RouterLink} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard  implements OnInit {
  stats: DashboardStats | null = null;
  recentSignals: TradingSignal[] = [];
  activeSignals: TradingSignal[] = [];
  loading = true;
  error = '';

  constructor(private signalService: SignalService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.signalService.getDashboardStats().subscribe({
      next: (stats) => { this.stats = stats; },
      error: () => { this.error = 'Cannot reach backend. Is Spring Boot running on :8080?'; this.loading = false; }
    });

    this.signalService.getSignals().subscribe({
      next: (signals) => {
        this.recentSignals = signals.slice(0, 5);
        this.activeSignals = signals
          .filter(s => s.status === 'ACTIVE')
          .sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0))
          .slice(0, 8);
        this.loading = false;
      }
    });
  }

  getSignalClass(type: string): string {
    return { BUY: 'buy', SELL: 'sell', HOLD: 'hold' }[type] ?? '';
  }

  getStatusClass(status: string): string {
    return { ACTIVE: 'active', TRIGGERED: 'triggered', EXPIRED: 'expired', CANCELLED: 'cancelled' }[status] ?? '';
  }

  confidenceColor(c: number): string {
    if (c >= 80) return '#22c55e';
    if (c >= 60) return '#f59e0b';
    return '#ef4444';
  }

  assetClassEntries(): [string, number][] {
    return this.stats ? Object.entries(this.stats.byAssetClass) : [];
  }

  strategyEntries(): [string, number][] {
    return this.stats ? Object.entries(this.stats.byStrategy) : [];
  }

  expireStale(): void {
    this.signalService.expireStale().subscribe({
      next: (res) => { alert(`${res.expired} stale signal(s) expired.`); this.loadDashboard(); }
    });
  }
}
