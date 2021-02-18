/* --- STATE --- */
interface Prediction {
  id: string;
  bet: number;
  prediction: number;
}
interface Draw {
  id: number;
  type: string;
  endTime: number;
  users: Prediction[];
}

export interface PullContainerState {
  isShowModal: boolean;
  drawData: Draw[];
  graphicsData: GraphicData[];
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
