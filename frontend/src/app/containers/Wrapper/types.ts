/* --- STATE --- */
import { User } from '../../../types/interfaces';

export interface WrapperState {
  activePage: string;
  user: User;
  tokenPrice: number;
  btcLastPrice: number;
}

export type ContainerState = WrapperState;
