/* --- STATE --- */
import { User } from '../../../types/interfaces';

export interface ContentState {
  user: User;
  activePage: string;
}

export type ContainerState = ContentState;
