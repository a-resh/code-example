/* --- STATE --- */
export interface UserDataState {}
export interface TableData {
  totem: string;
  stake: number;
  time: Date;
  prediction: number;
  projectedReturns: number;
  actualReturns: number;
}

export type ContainerState = UserDataState;
