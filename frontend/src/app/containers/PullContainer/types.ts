/* --- STATE --- */
export interface PullContainerState {
  isShowPredictModal: boolean;
  isShowConfirmModal: boolean;
  graphicsData: GraphicData[];
  allPayouts: number;
  loading: boolean;
}

export type ContainerState = PullContainerState;

export interface GraphicData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  transparent_open: number;
  transparent_high: number;
  transparent_low: number;
  transparent_close: number;
  transparent_volume: number;
  volume_transparency: any;
}

export interface MakePredictData {
  bitcoinPrice: number;
  stakeValue: number;
  address: string;
  days: number;
}
