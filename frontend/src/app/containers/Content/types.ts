/* --- STATE --- */
export interface ContentState {
  showConnectMetamaskModal: boolean;
  showErrorModal: boolean;
  tokenPrice: number;
}

export type ContainerState = ContentState;
