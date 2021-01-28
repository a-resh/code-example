import { generateMedia } from 'styled-media-query';

export const mediaQueries = generateMedia({
  large: '1100px',
  medium: '800px',
  small: '450px',
});

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
  USER: {
    name: 'My Account',
    icon: 'account-white.svg',
    color: '',
    message: 'Account',
  },
  UNISWAP: {
    name: 'Uniswap',
    icon: 'uniswap-black.svg',
    colorMobile: '#739BA2',
    color: '#C4DBE0',
    message: 'Uniswap',
  },
};
