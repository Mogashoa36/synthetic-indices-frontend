export type SignalType = 'BUY' | 'SELL' | 'HOLD';
export type SignalStatus = 'ACTIVE' | 'TRIGGERED' | 'EXPIRED' | 'CANCELLED';
export type Timeframe = 'M1' | 'M5' | 'M15' | 'M30' | 'H1' | 'H4' | 'D1' | 'W1';
export type AssetClass = 'FOREX' | 'CRYPTO' | 'INDICES' | 'COMMODITIES' | 'STOCKS';

export interface TradingSignal {
  id?: string;
  symbol: string;
  name: string;
  signalType: SignalType;
  timeframe: Timeframe;
  assetClass: AssetClass;
  status: SignalStatus;
  confidence: number;
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  currentPrice?: number;

  // Indicators
  rsi?: number;
  macd?: number;
  macdSignal?: number;
  macdHistogram?: number;
  bbUpper?: number;
  bbMiddle?: number;
  bbLower?: number;
  ema20?: number;
  ema50?: number;
  ema200?: number;
  atr?: number;
  volumeDelta?: number;

  // Meta
  strategy?: string;
  notes?: string;
  source?: string;
  riskRewardRatio?: number;
  pipValue?: number;

  signalTime?: string;
  expiresAt?: string;
  triggeredAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalSignals: number;
  activeSignals: number;
  buySignals: number;
  sellSignals: number;
  holdSignals: number;
  triggeredSignals: number;
  expiredSignals: number;
  avgConfidence: number;
  byAssetClass: Record<string, number>;
  byTimeframe: Record<string, number>;
  byStrategy: Record<string, number>;
}

export interface SignalFilter {
  symbol?: string;
  signalType?: SignalType | '';
  status?: SignalStatus | '';
  assetClass?: AssetClass | '';
  timeframe?: Timeframe | '';
  strategy?: string;
  minConfidence?: number;
}
