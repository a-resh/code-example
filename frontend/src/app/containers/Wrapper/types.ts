/* --- STATE --- */
import { Draw, User } from '../../../types/interfaces';

export interface WrapperState {
  activePage: string;
  user: User;
  tokenPrice: number;
  btcLastPrice: number;
  drawsData: Draw[];
}

export type ContainerState = WrapperState;
