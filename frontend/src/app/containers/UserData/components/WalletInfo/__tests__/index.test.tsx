import * as React from 'react';
import { render } from '@testing-library/react';

import { WalletInfo } from '../index';

describe('<WalletInfo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <WalletInfo user={{ id: '', balance: 0, frozenTokens: 0, inGame: 0 }} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
