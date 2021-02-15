/* --- STATE --- */
import { User } from '../../../types/interfaces';

export interface WrapperState {
  activePage: string;
  user: User;
}

export type ContainerState = WrapperState;
