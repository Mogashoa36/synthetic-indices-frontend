import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TradingSignal, DashboardStats, SignalFilter } from '../models/signals.model';

@Injectable({ providedIn: 'root' })
export class SignalService {
  private api = 'http://localhost:8080/api/signals';

  constructor(private http: HttpClient) {}

  getSignals(filter?: SignalFilter): Observable<TradingSignal[]> {
    let params = new HttpParams();
    if (filter?.symbol) params = params.set('symbol', filter.symbol);
    if (filter?.signalType) params = params.set('signalType', filter.signalType);
    if (filter?.status) params = params.set('status', filter.status);
    if (filter?.assetClass) params = params.set('assetClass', filter.assetClass);
    if (filter?.timeframe) params = params.set('timeframe', filter.timeframe);
    if (filter?.strategy) params = params.set('strategy', filter.strategy);
    if (filter?.minConfidence != null) params = params.set('minConfidence', filter.minConfidence);
    return this.http.get<TradingSignal[]>(this.api, { params });
  }

  getActiveSignals(): Observable<TradingSignal[]> {
    return this.http.get<TradingSignal[]>(`${this.api}/active`);
  }

  getHighConfidence(min = 75): Observable<TradingSignal[]> {
    return this.http.get<TradingSignal[]>(`${this.api}/high-confidence`, {
      params: new HttpParams().set('minConfidence', min)
    });
  }

  getById(id: string): Observable<TradingSignal> {
    return this.http.get<TradingSignal>(`${this.api}/${id}`);
  }

  create(signal: TradingSignal): Observable<TradingSignal> {
    return this.http.post<TradingSignal>(this.api, signal);
  }

  update(id: string, signal: TradingSignal): Observable<TradingSignal> {
    return this.http.put<TradingSignal>(`${this.api}/${id}`, signal);
  }

  updateStatus(id: string, status: string): Observable<TradingSignal> {
    return this.http.patch<TradingSignal>(`${this.api}/${id}/status`, { status });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats/dashboard`);
  }

  expireStale(): Observable<{ expired: number }> {
    return this.http.post<{ expired: number }>(`${this.api}/expire-stale`, {});
  }
}
