import * as React from 'react';
import { render } from '@testing-library/react';

import { WalletInfo } from '../index';

describe('<WalletInfo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <WalletInfo
        user={{ publicAddress: '', balance: 0, inGame: 0, btcAddress: '' }}
        setBtcAddress={() => {}}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
