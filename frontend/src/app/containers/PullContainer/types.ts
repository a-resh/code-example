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
  isShowDrawer: boolean;
  drawData: Draw[];
}

export type ContainerState = PullContainerState;
