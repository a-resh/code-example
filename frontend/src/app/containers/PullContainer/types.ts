/* --- STATE --- */

import { Draw } from '../../../types/interfaces';

export interface PullContainerState {
  isShowModal: boolean;
  graphicsData: GraphicData[];
  allPayouts: number;
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
