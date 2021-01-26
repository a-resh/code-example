export enum Totems {
  FOX = 'fox',
  WOLF = 'wolf',
  OWL = 'owl',
}

export enum Urls {
  FOX = 'fox',
  WOLF = 'wolf',
  OWL = 'owl',
  USER = 'user',
}
export interface Totem {
  name: string;
  color: string;
  mobileColor: string;
}
export const TotemsData = {
  FOX: {
    name: 'Fox',
    icon: 'fox-white.svg',
    color: '#FF6600',
    message: '15 days',
  },
  WOLF: {
    name: 'Wolf',
    icon: 'wolf-white.svg',
    color: '#455461',
    message: '30 days',
  },
  OWL: {
    name: 'Owl',
    iconMobile: 'owl-mobile-menu.svg',
    icon: 'owl-white.svg',
    colorMobile: '#C4DBE0',
    color: '#739BA2',
    message: '45 days',
  },
  USER: { name: 'My Account', icon: 'account-white.svg', color: '' },
  UNISWAP: {
    name: 'Uniswap',
    icon: 'uniswap-black.svg',
    colorMobile: '#739BA2',
    color: '#C4DBE0',
    message: 'Uniswap',
  },
};
