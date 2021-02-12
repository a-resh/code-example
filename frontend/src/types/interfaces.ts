export interface TotemBackground {
  background?: string;
}

export interface User {
  id: string;
  balance: number;
  frozenTokens: number;
  inGame: number;
}
