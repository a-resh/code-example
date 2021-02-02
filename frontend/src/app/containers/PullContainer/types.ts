/* --- STATE --- */
export interface PullContainerState {
    isShowDrawer: boolean;
}

export type ContainerState = PullContainerState;

export const SHOW_DRAWER = "pullContainer/SHOW_DRAWER";
export interface ShowDrawerAction {
    type: typeof SHOW_DRAWER;
}
